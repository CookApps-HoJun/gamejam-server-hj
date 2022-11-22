import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  uid: number;
  deviceId: string;
  nickname?: string;
  lang?: string;
  level?: number;
  exp?: number;
}
