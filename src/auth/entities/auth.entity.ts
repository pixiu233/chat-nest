import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class NV_Users {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
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
