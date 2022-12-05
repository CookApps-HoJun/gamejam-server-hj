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
import { PresetService } from './preset.service';
import { CreatePresetDto } from './dto/create-preset.dto';
import { UpdatePresetDto } from './dto/update-preset.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('preset')
@ApiTags('프리셋 API')
export class PresetController {
  constructor(private readonly presetService: PresetService) {}

  @Post()
  @ApiBody({
    type: CreatePresetDto,
    examples: {
      1: {
        value: {
          id: 1,
        } as CreatePresetDto,
      },
    },
  })
  @ApiOperation({
    summary: '프리셋 아이디 변경',
    description: 'id: (1, 2, 3)',
  })
  updateId(@Req() req, @Body() createPresetDto: CreatePresetDto) {
    const { uid } = req.user;
    const { id } = createPresetDto;
    return this.presetService.updateId(uid, id);
  }

  @Get()
  findAll() {
    return this.presetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.presetService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({
    type: UpdatePresetDto,
    examples: {
      1: {
        value: {
          skills: [1, 2, 3, 4, 5, 6],
        } as UpdatePresetDto,
      },
    },
  })
  @ApiOperation({
    summary: '프리셋 아이디 변경',
    description: 'id: (1, 2, 3)',
  })
  update(
    @Param('id') id: string,
    @Req() req,
    @Body() updatePresetDto: UpdatePresetDto,
  ) {
    const { uid } = req.user;
    return this.presetService.update(+id, uid, updatePresetDto);
  }
}
