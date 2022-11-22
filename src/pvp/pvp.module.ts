import { Module } from '@nestjs/common';
import { PvpService } from './pvp.service';
import { PvpController } from './pvp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pvp } from './entities/pvp.entity';
import { PvpResult } from './entities/pvpResult.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pvp, PvpResult])],
  controllers: [PvpController],
  providers: [PvpService],
})
export class PvpModule {}
