import { PartialType } from '@nestjs/swagger';
import { CreateVersionSpecDto } from './create-version-spec.dto';

export class UpdateVersionSpecDto extends PartialType(CreateVersionSpecDto) {}
