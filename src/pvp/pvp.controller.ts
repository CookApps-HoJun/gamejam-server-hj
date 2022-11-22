import { Controller, Get, Req } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { PvpService } from './pvp.service';

@Controller('pvp')
export class PvpController {
  constructor(private readonly pvpService: PvpService) {}

  @Get('rank')
  @ApiOperation({
    summary: '유저 조회(전체)',
    description: '전체유저를 조회한다.',
  })
  getRank(@Req() req) {
    return this.pvpService.getRank();
  }
}
