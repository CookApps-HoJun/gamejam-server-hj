import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';

@Entity({ name: 'pvpResult' })
export class PvpResult {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User, (user) => user.uid)
  uid: User;

  @ManyToMany(() => User, (user) => user.uid)
  enemy: User;

  @Column()
  result: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
