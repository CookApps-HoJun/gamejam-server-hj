import { Module } from '@nestjs/common';
import { VersionSpecService } from './version-spec.service';
import { VersionSpecController } from './version-spec.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Version } from './entities/version.entity';
import { Spec } from './entities/spec.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Version, Spec])],
  controllers: [VersionSpecController],
  providers: [VersionSpecService],
})
export class VersionSpecModule {}
