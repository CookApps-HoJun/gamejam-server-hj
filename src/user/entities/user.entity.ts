import { Character } from 'src/character/entities/character.entity';
import { Chest } from 'src/chest/entities/chest.entity';
import { Preset } from 'src/preset/entities/preset.entity';
import { Pvp } from 'src/pvp/entities/pvp.entity';
import { Skill } from 'src/skill/entities/skill.entity';
import {
  Entity,
  Column,
  OneToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column()
  deviceId: string;

  @OneToMany(() => Chest, (chest) => chest.user)
  chests: Chest[];

  @Column({ default: 1 })
  presetId: number;

  @OneToMany(() => Preset, (preset) => preset.user)
  presets: Preset[];

  @OneToMany(() => Skill, (skill) => skill.user)
  skills: Skill[];

  @OneToOne(() => Pvp, (pvp) => pvp.user)
  pvp: Pvp;

  @OneToMany(() => Character, (character) => character.user)
  characters: Character[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
