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
} from 'typeorm';
import { PresetSkill } from './preset-skill.entity';

@Entity('preset')
export class Preset {
  @PrimaryColumn()
  id: number;

  @PrimaryColumn()
  uid: number;

  @ManyToOne((type) => User, (user) => user.presets, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'uid' })
  user: User;

  //   @Column({ type: 'json' })
  //   skills: string;

  @ManyToMany((type) => Skill, { cascade: true })
  @JoinTable({
    name: 'preset_skill',
    // joinColumn: { name: "userId", referencedColumnName: "id" },
    // inverseJoinColumn: { name: "roleId" }
  })
  @OneToMany((type) => PresetSkill, (presetSkill) => presetSkill.preset)
  presetSkills: PresetSkill[];
}
