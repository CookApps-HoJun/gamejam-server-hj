import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TempService } from './temp.service';
import { CreateTempDto } from './dto/create-temp.dto';
import { UpdateTempDto } from './dto/update-temp.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('temp')
@ApiTags('임시 API')
export class TempController {
  constructor(private readonly tempService: TempService) {}

  @Post()
  @ApiOperation({
    summary: '임시 데이터 저장',
  })
  @ApiBody({
    type: CreateTempDto,
    examples: {
      1: {
        summary: '임시 데이터',
        description:
          'type은 제약조건 없음, data은 json serialize하여 string 으로 전송 ',
        value: {
          uid: 1,
          type: ['UserData', 'CurrencyData'],
          data: [
            '{"nickName":"드디어","rp":1032,"cw":3,"presetId":1,"characterId":101,"profileId":1}',
            '{"coin":600,"jewel":0,"key":0}',
          ],
        } as CreateTempDto,
      },
    },
  })
  async upsert(@Body() createTempDto: CreateTempDto) {
    return await this.tempService.upsert(createTempDto);
  }

  @Get(':uid/:type')
  @ApiOperation({
    summary: '임시 데이터 조회',
  })
  async findOne(@Param('uid') uid: number, @Param('type') type: string) {
    const temp = await this.tempService.findOne(uid, type);

    return temp?.data ? JSON.parse(temp.data) : null;
  }
}
