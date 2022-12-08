import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from 'src/auth/dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepo.save({ ...createUserDto, nickname: 'guest' });
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(loginDto: LoginDto) {
    return await this.userRepo.findOne({
      where: { deviceId: loginDto.dId },
      relations: ['currency', 'pvp', 'presets', 'skills'],
    });
  }

  update(uid: number, updateUserDto: UpdateUserDto) {
    return this.userRepo.save({ ...updateUserDto, uid });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
