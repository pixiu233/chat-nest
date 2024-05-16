import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friendship } from './entities/Friendship.entity';
import { NV_Users } from '../auth/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Friendship]),
    TypeOrmModule.forFeature([NV_Users]),
  ],
  controllers: [FriendController],
  providers: [FriendService],
})
export class FriendModule {}
