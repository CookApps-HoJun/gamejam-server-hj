import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVersionSpecDto } from './dto/create-version-spec.dto';
import { UpdateVersionSpecDto } from './dto/update-version-spec.dto';
import { Spec } from './entities/spec.entity';
import { Version } from './entities/version.entity';

@Injectable()
export class VersionSpecService {
  constructor(
    @InjectRepository(Version) private versionpRepo: Repository<Version>,
    @InjectRepository(Spec) private specRepo: Repository<Spec>,
  ) {}

  async uploadSpec(specs: any) {
    const { version } = await this.versionpRepo.save({});
    console.log(version);

    for (const key of Object.keys(specs)) {
      await this.specRepo.save({
        version,
        type: key,
        data: JSON.stringify(specs[key]),
      });
    }

    return 'This action adds a new versionSpec';
  }

  async getSpec(type: string, version) {
    return await this.specRepo.findOne({
      where: {
        version,
        type,
      },
    });
  }
  async getVersion() {
    return await this.versionpRepo.find({
      take: 1,
      order: {
        version: 'DESC',
      },
    });
  }
}
