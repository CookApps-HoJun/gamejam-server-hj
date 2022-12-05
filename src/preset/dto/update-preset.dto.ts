import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePresetDto } from './create-preset.dto';

export class UpdatePresetDto {
  @ApiProperty({ description: '프리셋 스킬 정보' })
  skills: number[];
}
