import { Module } from '@nestjs/common';
import { PresetService } from './preset.service';
import { PresetController } from './preset.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Preset } from './entities/preset.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Preset, User])],
  controllers: [PresetController],
  providers: [PresetService],
})
export class PresetModule {}
