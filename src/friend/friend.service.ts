import { BadRequestException, Injectable } from '@nestjs/common';

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

  async createFriendship(senderId, receiverId) {
    if (!senderId || !receiverId) throw new BadRequestException('请输入id');
    // 检查是否已经是好友或已经发出了未确认的请求
    const existingRequest = await this.friendshipRepository.find({
      where: [
        {
          sender: { userId: senderId },
          isConfirmed: false,
          receiver: { userId: receiverId },
        },
      ],
    });

    console.log(existingRequest);
    if (existingRequest.length > 0) {
      throw new BadRequestException('已经是好友了.');
    }

    // 创建新的友谊请求
    const newFriendship = this.friendshipRepository.create({
      sender: { userId: senderId },
      receiver: { userId: receiverId },
      isConfirmed: false,
    });

    // 保存到数据库
    return this.friendshipRepository.save(newFriendship);
  }

  async findFriendsOfUser(userId: number, isConfirmed: boolean) {
    console.log(userId);
    // 找出作为发送者且已确认的关系
    return await this.friendshipRepository
      .createQueryBuilder('friendship')
      .leftJoinAndSelect('friendship.receiver', 'receiver')
      .where(
        'friendship.sender = :userId AND friendship.isConfirmed = :isConfirmed',
        {
          userId,
          isConfirmed,
        },
      )
      .select([
        'friendship.id',
        'friendship.isConfirmed',
        'receiver.userId',
        'receiver.username',
        'receiver.avatar',
        'receiver.mobilePhone',
      ])
      .getMany();
  }

  async confirmFriendship(senderId, receiverId) {
    const friendship = await this.friendshipRepository.findOne({
      where: [
        {
          sender: { userId: senderId },
          receiver: { userId: receiverId },
          isConfirmed: false,
        },
      ],
    });
    if (!friendship) {
      throw new BadRequestException('没有待确认的好友请求.');
    }
    friendship.isConfirmed = true;

    // 更新记录，确认好友请求
    return await this.friendshipRepository.save(friendship);
    // return this.friendshipRepository.save(friendship);
  }

  async rejectFriendship(senderId, receiverId, isDelete) {
    const friendship = await this.friendshipRepository.findOne({
      where: [
        {
          sender: { userId: senderId },
          receiver: { userId: receiverId },
          isConfirmed: isDelete,
        },
      ],
    });

    if (!friendship) {
      throw new BadRequestException('没有待确认的好友请求.');
    }
    // 根据需求决定是否删除请求或标记为已拒绝
    // 这里简单地假设删除请求
    return await this.friendshipRepository.remove(friendship);
  }
}
