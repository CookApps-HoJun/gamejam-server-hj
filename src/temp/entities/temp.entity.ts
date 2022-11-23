import {
  Entity,
  Column,
  Index,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  PrimaryColumn,
} from "typeorm";

@Entity({ name: "temp" })
export class Temp {
  @PrimaryColumn()
  uid: number;

  @PrimaryColumn()
  type: string;

  @Column({ nullable: true })
  data: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
