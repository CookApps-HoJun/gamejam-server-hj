import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: '헬스체크',
    description: '서버의 상태가 건강한지 체크한다.',
  })
  healthcheck(): string {
    return this.appService.healthcheck();
  }
}
