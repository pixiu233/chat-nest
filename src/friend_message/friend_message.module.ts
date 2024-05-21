import { Module } from '@nestjs/common';
import { FriendMessageService } from './friend_message.service';
import { FriendMessageController } from './friend_message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NV_Users } from '../auth/entities/user.entity';
import { FriendMessage } from './entities/friend_message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FriendMessage]),
    TypeOrmModule.forFeature([NV_Users]),
  ],
  controllers: [FriendMessageController],
  providers: [FriendMessageService],
})
export class FriendMessageModule {}
