import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class NV_Users {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Exclude()
  @Column()
  password: string;
  @Column()
  email: string;
  @Column()
  avatar: string;
  @Column()
  mobilePhone: number;
  @CreateDateColumn({ type: 'timestamp' })
  createTime?: Date;
  @CreateDateColumn({ type: 'timestamp' })
  updateTime?: Date;
}
