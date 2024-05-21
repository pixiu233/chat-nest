import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
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
  async add_friend(@Body() createFriendDto: CreateFriendDto) {
    const { senderId, receiverId } = createFriendDto;
    return await this.friendService.createFriendship(senderId, receiverId);
  }
  @Post('get_friend')
  @ApiOperation({ summary: '查找好友关系' })
  async get_friend(@Body() createFriendDto) {
    const { userId } = createFriendDto;
    return await this.friendService.findFriendsOfUser(userId, true);
  }
  @Post('get_not_yet_friend')
  @ApiOperation({ summary: '查找好友关系' })
  async get_not_yet_friend(@Body() createFriendDto) {
    const { userId } = createFriendDto;
    return await this.friendService.findFriendsOfUser(userId, false);
  }

  @ApiOperation({ summary: 'Confirm a friend request' })
  // 确认好友请求
  @Put(':senderId/:receiverId/confirm')
  async confirmFriendRequest(
    @Param('senderId') senderId: string,
    @Param('receiverId') receiverId: string,
  ) {
    return await this.friendService.confirmFriendship(senderId, receiverId);
  }

  @ApiOperation({ summary: 'Reject a friend request' })
  @ApiResponse({
    status: 200,
    description: 'Friend request rejected successfully.',
  })
  @ApiResponse({ status: 404, description: 'Friendship request not found.' })
  // 拒绝好友请求
  @Put(':senderId/:receiverId/reject')
  async rejectFriendRequest(
    @Param('senderId') senderId: string,
    @Param('receiverId') receiverId: string,
  ) {
    return await this.friendService.rejectFriendship(
      senderId,
      receiverId,
      false,
    );
  }

  @ApiOperation({ summary: 'Delete a friend request' })
  @ApiResponse({
    status: 200,
    description: 'Friend request rejected successfully.',
  })
  @ApiResponse({ status: 404, description: 'Friendship request not found.' })
  // 拒绝好友请求
  @Put(':senderId/:receiverId/delete')
  async deleteFriendRequest(
    @Param('senderId') senderId: string,
    @Param('receiverId') receiverId: string,
  ) {
    return await this.friendService.rejectFriendship(
      senderId,
      receiverId,
      true,
    );
  }
}
