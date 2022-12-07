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
} from 'typeorm';

@Entity({ name: 'pvp' })
export class Pvp {
  @PrimaryGeneratedColumn()
  id: number;

  @RelationId((pvp: Pvp) => pvp.user)
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
