import { Body, Controller, Get, Post, Put, Request } from '@nestjs/common';
import { FriendMessageService } from './friend_message.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { query } from 'express';

@Controller('friend_message')
@ApiTags('好友聊天记录模块')
export class FriendMessageController {
  constructor(private readonly friendMessageService: FriendMessageService) {}
  @ApiOperation({ summary: '查找好友聊天记录' })
  @ApiResponse({
    status: 200,
    description: '查询好友聊天记录成功.',
  })
  @ApiResponse({ status: 404, description: 'Friendship request not found.' })
  // 拒绝好友请求
  @Get('get_friend_message')
  async get_friend_message(@Request() req) {
    console.log(req, 'cccccc');
    const { senderId, receiverId, current, pageSize } = req.query;
    return await this.friendMessageService.getFriendMessages(
      senderId,
      receiverId,
      current,
      pageSize,
    );
  }
}
