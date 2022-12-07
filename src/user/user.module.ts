import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { UserSubscriber } from './user.subscriber';
import { PresetSkill } from 'src/preset/entities/preset-skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, PresetSkill])],
  controllers: [UserController],
  providers: [UserService, UserSubscriber],
  exports: [UserService],
})
export class UserModule {}
