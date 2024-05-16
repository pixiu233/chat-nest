import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Friendship } from '../../friend/entities/Friendship.entity';
// import { Friend } from '../../friends/entities/friend.entity';

@Entity()
export class NV_Users {
  @PrimaryGeneratedColumn()
  userId: number;
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
  @OneToMany(() => Friendship, (friendship) => friendship.userA)
  friendshipsAsA: Friendship[];
  @OneToMany(() => Friendship, (friendship) => friendship.userB)
  friendshipsAsB: Friendship[];
  @ManyToMany(() => NV_Users, (user) => user.friends)
  @JoinTable()
  friends: NV_Users[];
  @CreateDateColumn({ type: 'timestamp' })
  createTime?: Date;
  @CreateDateColumn({ type: 'timestamp' })
  updateTime?: Date;
}
