import { Skill } from 'src/skill/entities/skill.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Preset } from './preset.entity';

@Entity('preset_skill')
export class PresetSkill {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Preset)
  preset: Preset;

  @ManyToOne((type) => Skill)
  skill: Skill;

  @Column()
  order: number;
}
