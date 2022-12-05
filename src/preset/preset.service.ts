import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePresetDto } from './dto/create-preset.dto';
import { UpdatePresetDto } from './dto/update-preset.dto';
import { Preset } from './entities/preset.entity';

@Injectable()
export class PresetService {
  constructor(
    @InjectRepository(Preset)
    private presetRepo: Repository<Preset>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  create(createPresetDto: CreatePresetDto) {
    return 'This action adds a new preset';
  }

  findAll() {
    return `This action returns all preset`;
  }

  findOne(id: number) {
    return `This action returns a #${id} preset`;
  }

  async update(uid: number, id: number, updatePresetDto: UpdatePresetDto) {
    const { skills } = updatePresetDto;
    return this.presetRepo.save({
      uid,
      id,
      skills: JSON.stringify(skills),
    });
  }

  remove(id: number) {
    return `This action removes a #${id} preset`;
  }

  updateId(uid: number, presetId: number) {
    return this.userRepo.save({ uid, presetId });
  }
}
