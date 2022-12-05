import { Character } from 'src/character/entities/character.entity';
import { Chest } from 'src/chest/entities/chest.entity';
import { Pvp } from 'src/pvp/entities/pvp.entity';
import {
  Entity,
  Column,
  OneToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column()
  deviceId: string;

  @OneToMany(() => Chest, (chest) => chest.user)
  chests: Chest[];

  @OneToMany(() => Character, (character) => character.user)
  characters: Chest[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
