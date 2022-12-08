import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { pvpReuslt } from './dto/pvp-result.dto';
import { PvpService } from './pvp.service';

@Controller('pvp')
@ApiTags('pvp API')
export class PvpController {
  constructor(private readonly pvpService: PvpService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('rank')
  @ApiOperation({
    summary: '랭킹 조회',
    description: '100위까지의 랭킹을 조회한다.',
  })
  getRank(@Req() req) {
    const { uid } = req.user;
    return this.pvpService.getRank(uid);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('start')
  @ApiOperation({
    summary: 'pvp 시작',
    description: 'pvp 시작 , 매칭 상대 리턴',
  })
  start(@Req() req) {
    const { uid } = req.user;

    return this.pvpService.getEnemy(uid);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('end')
  @ApiOperation({
    summary: 'pvp 종료, ',
    description:
      'pvp결과 서버로 쏘기 및 다음 상대 요청, result(승리: true, 패배: false), keepPvp(다음상대 요청: true, 종료: false)',
  })
  async result(@Req() req, @Body() dto: pvpReuslt) {
    const { uid } = req.user;
    const { enemy, result, keepPvp } = dto;
    const score = await this.pvpService.calcScore(uid, enemy, result);

    await this.pvpService.updateScore(uid, score.pAfter);

    return {
      score,
      nextEnemy: keepPvp ? await this.pvpService.getEnemy(uid) : null,
    };
  }
}
