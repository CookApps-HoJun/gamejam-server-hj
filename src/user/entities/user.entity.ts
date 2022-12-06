import { Character } from 'src/character/entities/character.entity';
import { Chest } from 'src/chest/entities/chest.entity';
import { Currency } from 'src/currency/entities/currency.entity';
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

  @Column()
  nickname: string;

  @Column({ default: 1 })
  level: number;

  @OneToMany(() => Chest, (chest) => chest.user, { cascade: true })
  chests: Chest[];

  @Column({ default: 1 })
  presetId: number;

  @OneToMany(() => Preset, (preset) => preset.user, { cascade: true })
  presets: Preset[];

  @OneToMany(() => Skill, (skill) => skill.user, { cascade: true })
  skills: Skill[];

  @OneToOne(() => Pvp, (pvp) => pvp.user, { cascade: true })
  pvp: Pvp;

  @OneToOne(() => Currency, (currency) => currency.user, { cascade: true })
  currency: Currency;

  @OneToMany(() => Character, (character) => character.user, {
    cascade: true,
  })
  characters: Character[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
