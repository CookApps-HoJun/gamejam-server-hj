import { ApiProperty } from '@nestjs/swagger';

export class CreatePresetDto {
  @ApiProperty({ description: '프리셋아이디' })
  id: number;
}
