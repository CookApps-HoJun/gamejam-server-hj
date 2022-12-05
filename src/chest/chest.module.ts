import { Module } from '@nestjs/common';
import { ChestService } from './chest.service';
import { ChestController } from './chest.controller';
import { Chest } from './entities/chest.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Chest])],
  controllers: [ChestController],
  providers: [ChestService],
})
export class ChestModule {}
