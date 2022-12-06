import { PresetSkill } from 'src/preset/entities/preset-skill.entity';
import { Preset } from 'src/preset/entities/preset.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  OneToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  JoinColumn,
  RelationId,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'skill' })
export class Skill {
  @PrimaryColumn()
  id: number;

  @PrimaryColumn()
  uid: number;

  @ManyToOne((type) => User, (user) => user.presets, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'uid' })
  user: User;

  @Column()
  level: number;

  @Column()
  amount: number;

  @OneToMany((type) => PresetSkill, (presetSkill) => presetSkill.skill)
  presetSkills: PresetSkill[];

  // @CreateDateColumn()
  // createdAt: Date;

  // @UpdateDateColumn()
  // updatedAt: Date;
}
