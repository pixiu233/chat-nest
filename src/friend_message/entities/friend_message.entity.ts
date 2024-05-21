import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { NV_Users } from '../../auth/entities/user.entity';
@Entity()
export class FriendMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => NV_Users, (user) => user.friendshipsAsA, {
    onDelete: 'CASCADE',
  })
  sender: NV_Users;

  @ManyToOne(() => NV_Users, (user) => user.friendshipsAsB, {
    onDelete: 'CASCADE',
  })
  receiver: NV_Users;
  @Column()
  msg: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  time: Date;
}
