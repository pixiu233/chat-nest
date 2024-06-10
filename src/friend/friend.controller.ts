import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FriendService } from './friend.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateFriendDto } from './dto/create-friend.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('friend')
@ApiTags('好友模块')
@UseGuards(AuthGuard('jwt'))
export class FriendController {
  constructor(private readonly friendService: FriendService) {}
  @Post('add_friend')
  @ApiOperation({ summary: '添加好友关系' })
  async add_friend(@Body() createFriendDto: CreateFriendDto, @Request() req) {
    const userId = req.user.userId;
    const { receiverId } = createFriendDto;
    return await this.friendService.createFriendship(userId, receiverId);
  }
  @Post('get_friend')
  @ApiOperation({ summary: '查找好友关系' })
  async get_friend(@Request() req) {
    const userId = req.user.userId;
    return await this.friendService.findFriendsOfUser(userId, true);
  }
  @Post('get_not_yet_friend')
  @ApiOperation({ summary: '查找还未好友关系' })
  async get_not_yet_friend(@Request() req) {
    const { userId } = req.user;
    return await this.friendService.findFriendsOfUser(userId, false);
  }

  @ApiOperation({ summary: 'Confirm a friend request' })
  // 确认好友请求
  @Put(':receiverId/confirm')
  async confirmFriendRequest(
    @Param('receiverId') receiverId: string,
    @Request() req,
  ) {
    const { userId } = req.user;
    return await this.friendService.confirmFriendship(userId, receiverId);
  }

  @ApiOperation({ summary: 'Reject a friend request' })
  @ApiResponse({
    status: 200,
    description: 'Friend request rejected successfully.',
  })
  @ApiResponse({ status: 404, description: 'Friendship request not found.' })
  // 拒绝好友请求
  @Put(':receiverId/reject')
  async rejectFriendRequest(
    @Param('receiverId') receiverId: string,
    @Request() req,
  ) {
    const { userId } = req.user;
    return await this.friendService.rejectFriendship(userId, receiverId, false);
  }

  @ApiOperation({ summary: 'Delete a friend request' })
  @ApiResponse({
    status: 200,
    description: 'Friend request rejected successfully.',
  })
  @ApiResponse({ status: 404, description: 'Friendship request not found.' })
  // 拒绝好友请求
  @Put(':receiverId/delete')
  async deleteFriendRequest(
    @Param('receiverId') receiverId: string,
    @Request() req,
  ) {
    const { userId } = req.user;
    return await this.friendService.rejectFriendship(userId, receiverId, true);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '获取所有没有建立关系的用户' })
  @Get('list_without_friends')
  async getF(@Request() req) {
    const { userId } = req.user;
    return await this.friendService.getAllWithout(userId);
  }
}
