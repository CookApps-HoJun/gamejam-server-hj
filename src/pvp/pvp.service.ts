import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Pvp } from "./entities/pvp.entity";
import { PvpResult } from "./entities/pvpResult.entity";

@Injectable()
export class PvpService {
  constructor(
    @InjectRepository(Pvp)
    private pvpRepo: Repository<Pvp>,
    @InjectRepository(PvpResult)
    private pvpResultRepo: Repository<PvpResult>
  ) {}

  async getRank() {
    return await this.pvpRepo.find({ relations: ["user"], take: 100 });
  }
}
