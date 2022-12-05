import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ChestService } from './chest.service';
import { CreateChestDto } from './dto/create-chest.dto';
import { UpdateChestDto } from './dto/update-chest.dto';

@Controller('chest')
@ApiTags('상자 API')
export class ChestController {
  constructor(private readonly chestService: ChestService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('open/:id')
  @ApiOperation({
    summary: '상자 오픈123',
    description: '상자오픈',
  })
  async open(@Param('id') id: string, @Req() req) {
    const { uid } = req.user;
    return await this.chestService.open(+id, uid);
  }
}
