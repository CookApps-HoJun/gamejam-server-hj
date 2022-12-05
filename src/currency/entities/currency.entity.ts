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
} from 'typeorm';

@Entity({ name: 'currency' })
export class Currency {
  @PrimaryColumn()
  uid: number;
  @OneToOne((type) => User)
  @JoinColumn({
    name: 'uid',
  })
  user: User;

  @Column()
  coin: number;

  @Column()
  jewel: number;

  @Column()
  key: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
