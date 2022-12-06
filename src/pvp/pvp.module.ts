import { Module } from '@nestjs/common';
import { PvpService } from './pvp.service';
import { PvpController } from './pvp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pvp } from './entities/pvp.entity';
import { PvpResult } from './entities/pvpResult.entity';
import { Preset } from 'src/preset/entities/preset.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pvp, PvpResult, Preset])],
  controllers: [PvpController],
  providers: [PvpService],
})
export class PvpModule {}
