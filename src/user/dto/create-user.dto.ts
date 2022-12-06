import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({ description: '유저 기기아이디' })
  deviceId?: string;
  nickname?: string;
}
