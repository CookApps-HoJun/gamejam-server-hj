import { Pvp } from "src/pvp/entities/pvp.entity";
import {
  Entity,
  Column,
  OneToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column()
  deviceId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
