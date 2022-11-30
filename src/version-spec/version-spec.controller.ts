import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { VersionSpecService } from './version-spec.service';
import { CreateVersionSpecDto } from './dto/create-version-spec.dto';
import { UpdateVersionSpecDto } from './dto/update-version-spec.dto';

@Controller()
export class VersionSpecController {
  constructor(private readonly versionSpecService: VersionSpecService) {}

  @Get('/version')
  async getVersion() {
    const [{ version }] = await this.versionSpecService.getVersion();

    return { version };
  }

  @Get('/spec/:table/:version')
  async findOne(
    @Param('table') table: string,
    @Param('version') version: string,
  ) {
    const result = await this.versionSpecService.getSpec(table, +version);
    return { [result.type]: JSON.parse(result.data) };
  }

  @Post('/spec')
  uploadSpec(@Req() req: any) {
    return this.versionSpecService.uploadSpec(req.body);
  }
}
