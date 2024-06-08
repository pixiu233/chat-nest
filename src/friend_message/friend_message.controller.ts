import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FriendMessageService } from './friend_message.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('friend_message')
@ApiTags('好友聊天记录模块')
@UseGuards(AuthGuard('jwt'))
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
    const { receiverId, current, pageSize } = req.query;
    const userId = req.user.userId;
    return await this.friendMessageService.getFriendMessages(
      userId,
      receiverId,
      current,
      pageSize,
    );
  }
}
