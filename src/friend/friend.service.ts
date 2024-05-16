import { Injectable } from '@nestjs/common';

import { Friendship } from './entities/Friendship.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NV_Users } from '../auth/entities/user.entity';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(Friendship)
    private friendshipRepository: Repository<Friendship>,
    @InjectRepository(NV_Users) private readonly user: Repository<NV_Users>,
  ) {}

  async createFriendship(userId: number, friendId: number) {
    const userA = await this.user.findOneOrFail({ where: { userId } });
    const userB = await this.user.findOneOrFail({
      where: { userId: friendId },
    });

    if (!userA || !userB) {
      throw new Error('One or both users not found');
    }

    // 确保关系是双向的
    // userA.friends.push(userB);
    // userB.friends.push(userA);

    // 如果使用Friendship实体作为连接表
    const friendship = this.friendshipRepository.create({
      userA,
      userB,
      isConfirmed: false, // 假设初始时未确认
    });

    // 注意：你可能需要手动处理双向关系的同步，取决于你的实体定义
    // await this.user.save([userA, userB]);
    return await this.friendshipRepository.save(friendship);
  }
  async getFriendsForUser(userId: number) {
    const friendships = await this.friendshipRepository.find({
      where: [
        { userA: { userId }, isConfirmed: false },
        // { userB: { userId }, isConfirmed: false },
      ],
    });
    const friendIds = friendships.flatMap((item) => {
      console.log(item, userId, item.id == userId);
      return item.id == userId ? [] : [item.id];
    });
    console.log(friendIds);
    return this.user.findByIds(friendIds);
  }
}
