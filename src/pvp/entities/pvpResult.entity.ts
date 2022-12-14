import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  AfterInsert,
} from 'typeorm';

@Entity({ name: 'pvpResult' })
export class PvpResult {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.uid, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'uid',
  })
  user: User;

  @ManyToOne(() => User, (user) => user.uid, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'enemyUid',
  })
  enemy: User;

  @Column()
  result: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
