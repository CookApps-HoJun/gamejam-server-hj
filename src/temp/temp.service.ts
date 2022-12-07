import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTempDto } from './dto/create-temp.dto';
import { UpdateTempDto } from './dto/update-temp.dto';
import { Temp } from './entities/temp.entity';

@Injectable()
export class TempService {
  constructor(@InjectRepository(Temp) private tempRepo: Repository<Temp>) {}

  upsert({ uid, type, data }: CreateTempDto) {
    const saveData = type.map((t, i) => ({
      uid,
      type: t,
      data: data[i],
    }));
    return this.tempRepo.save(saveData);
  }
  // upsert(createTempDto: CreateTempDto) {
  //   return this.tempRepo.upsert(createTempDto, ["uid", "type"]);
  // }

  findOne(uid: number, type: string) {
    return this.tempRepo.findOne({ where: { uid, type } });
  }

  find(uid: number) {
    return this.tempRepo.find({ where: { uid } });
  }
}
