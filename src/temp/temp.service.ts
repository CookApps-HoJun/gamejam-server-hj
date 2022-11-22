import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTempDto } from "./dto/create-temp.dto";
import { UpdateTempDto } from "./dto/update-temp.dto";
import { Temp } from "./entities/temp.entity";

@Injectable()
export class TempService {
  constructor(@InjectRepository(Temp) private tempRepo: Repository<Temp>) {}

  upsert(createTempDto: CreateTempDto) {
    return this.tempRepo.save(createTempDto);
  }
  // upsert(createTempDto: CreateTempDto) {
  //   return this.tempRepo.upsert(createTempDto, ["uid", "type"]);
  // }

  findOne(uid: number, type: string) {
    return this.tempRepo.findOne({ where: { uid, type } });
  }
}
