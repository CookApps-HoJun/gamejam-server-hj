import { Module } from "@nestjs/common";
import { TempService } from "./temp.service";
import { TempController } from "./temp.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Temp } from "./entities/temp.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Temp])],
  controllers: [TempController],
  providers: [TempService],
})
export class TempModule {}
