import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  RelationId,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'pvp' })
export class Pvp {
  @PrimaryColumn()
  uid: number;

  @OneToOne((type) => User, (user) => user.uid)
  @JoinColumn({
    name: 'uid',
  })
  user: User;

  @Column()
  score: number;

  @Column({ nullable: true })
  yesterdayRank: number;
}
