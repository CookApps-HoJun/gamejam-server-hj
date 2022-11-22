import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTempDto } from "./dto/create-temp.dto";
import { UpdateTempDto } from "./dto/update-temp.dto";
import { Temp } from "./entities/temp.entity";

@Injectable()
export class TempService {
  constructor(@InjectRepository(Temp) private tempRepo: Repository<Temp>) {}

  create(createTempDto: CreateTempDto) {
    return this.tempRepo.save(createTempDto);
  }
  upsert(createTempDto: CreateTempDto) {
    return this.tempRepo.upsert(createTempDto, ["uid", "type"]);
  }

  findOne(id: number) {
    return `This action returns a #${id} temp`;
  }

  update(id: number, updateTempDto: UpdateTempDto) {
    return `This action updates a #${id} temp`;
  }

  remove(id: number) {
    return `This action removes a #${id} temp`;
  }
}
