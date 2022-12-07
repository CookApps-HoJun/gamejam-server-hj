import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { PresetSkill } from 'src/preset/entities/preset-skill.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(PresetSkill)
    private presetSkillRepo: Repository<PresetSkill>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepo.save({ ...createUserDto, nickname: 'guest' });
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(loginDto: LoginDto) {
    const user = await this.userRepo.findOne({
      where: loginDto,
      relations: ['currency', 'pvp', 'skills'],
    });

    if (user) {
      const presetSkill = (
        await this.presetSkillRepo.find({
          where: {
            uid: user.uid,
          },
        })
      ).reduce(
        (acc, val) => {
          acc[val.presetId][val.order - 1] = val.skillId;
          return acc;
        },
        { 1: [], 2: [], 3: [] },
      );
      return { ...user, presetSkill };
    }
    return user;
  }

  update(uid: number, updateUserDto: UpdateUserDto) {
    return this.userRepo.save({ ...updateUserDto, uid });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
