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
  // @PrimaryGeneratedColumn()
  // id: number;

  @PrimaryColumn()
  skillId: number;

  @PrimaryColumn()
  skillUid: number;

  @PrimaryColumn()
  presetId: number;

  @PrimaryColumn()
  presetUid: number;

  @ManyToOne((type) => Preset)
  // @JoinColumn({ name: 'presetId' })
  // @JoinColumn({ name: 'puid' })
  preset: Preset;

  @ManyToOne((type) => Skill)
  // @JoinColumn({ name: 'skillId' })
  // @JoinColumn({ name: 'suid' })
  skill: Skill;

  @Column()
  order: number;
}
