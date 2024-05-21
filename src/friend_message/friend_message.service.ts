import { BadRequestException, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { NV_Users } from '../auth/entities/user.entity';
import { FriendMessage } from './entities/friend_message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FriendMessageService {
  constructor(
    @InjectRepository(FriendMessage)
    private FriendMessageRepository: Repository<FriendMessage>,
    @InjectRepository(NV_Users) private readonly user: Repository<NV_Users>,
  ) {}

  async getFriendMessages(
    senderId: string,
    receiverId: string,
    current: number,
    pageSize: number,
  ) {
    if (!senderId || !receiverId) throw new BadRequestException('请输入id.');
    const messages = await this.FriendMessageRepository.createQueryBuilder(
      'friendMessage',
    )
      .orderBy('friendMessage.time', 'DESC')
      .where(
        'friendMessage.sender= :senderId AND friendMessage.receiver = :receiverId',
        { senderId: senderId, receiverId: receiverId },
      )
      .orWhere(
        'friendMessage.sender= :receiverId AND friendMessage.receiver = :senderId',
        { senderId: senderId, receiverId: receiverId },
      )
      .skip(current)
      .take(pageSize)
      .getMany();
    return messages;
  }
}
