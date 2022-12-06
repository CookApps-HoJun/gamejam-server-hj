import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePresetDto } from './dto/create-preset.dto';
import { UpdatePresetDto } from './dto/update-preset.dto';
import { PresetSkill } from './entities/preset-skill.entity';
import { Preset } from './entities/preset.entity';

@Injectable()
export class PresetService {
  constructor(
    @InjectRepository(PresetSkill)
    private presetSkillRepo: Repository<PresetSkill>,
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

  async update(id: number, uid: number, updatePresetDto: UpdatePresetDto) {
    const { skills } = updatePresetDto;

    const oldPreset = await this.presetSkillRepo.find({
      where: {
        preset: { id, uid },
      },
    });

    await this.presetSkillRepo.remove(oldPreset);

    const newPreset = skills.map((s, i) => ({
      preset: {
        user: { uid },
        id,
      },
      skill: {
        id: s,
        user: { uid },
      },
      order: i + 1,
    }));

    return this.presetSkillRepo.save(newPreset);
  }

  remove(id: number) {
    return `This action removes a #${id} preset`;
  }

  updateId(uid: number, presetId: number) {
    return this.userRepo.save({ uid, presetId });
  }
}
