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
} from 'typeorm';

@Entity({ name: 'chest' })
export class Chest {
  @PrimaryColumn()
  id: number;

  @PrimaryColumn()
  uid: number;

  @ManyToOne((type) => User, (user) => user.chests, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'uid' })
  user: User;

  @Column({ default: 0 })
  amount: number;

  @Column({ nullable: true })
  openTime: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
