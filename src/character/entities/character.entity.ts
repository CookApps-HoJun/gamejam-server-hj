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

@Entity({ name: 'character' })
export class Character {
  @PrimaryColumn()
  id: number;

  @PrimaryColumn()
  uid: number;

  @ManyToOne((type) => User, (user) => user.characters, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'uid' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
