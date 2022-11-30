import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { Version } from './version.entity';

@Entity({ name: 'spec' })
export class Spec {
  @PrimaryColumn()
  @ManyToOne(() => Version, (version) => version.version)
  @JoinColumn({
    name: 'version',
  })
  version: number;

  @PrimaryColumn()
  type: string;

  @Column({ nullable: true, type: 'mediumtext' })
  data: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
