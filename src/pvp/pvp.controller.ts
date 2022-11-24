import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
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
    return this.pvpService.getRank();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('start')
  @ApiOperation({
    summary: 'pvpstart',
    description: 'pvp 시작 , 매칭 상대 리턴',
  })
  start(@Req() req) {
    const { uid } = req.user;

    return this.pvpService.getEnemy(uid);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('result')
  @ApiOperation({
    summary: '랭킹 조회',
    description: '100위까지의 랭킹을 조회한다.',
  })
  result(@Body() dto: any) {
    const { user, enemy } = dto;
    return this.pvpService.calcScore(user, enemy, 1);
  }
}
