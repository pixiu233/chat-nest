import {
  Controller,
  Post,
  Body,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FriendService } from './friend.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateFriendDto } from './dto/create-friend.dto';

@Controller('friend')
@ApiTags('好友模块')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}
  @Post('add_friend')
  @ApiOperation({ summary: '添加好友关系' })
  async add_friend(@Body() createFriendDto: CreateFriendDto) {
    const { userId, friendId } = createFriendDto;
    try {
      const res = await this.friendService.createFriendship(userId, friendId);
      return res;
    } catch (error) {
      if (error instanceof NotFoundException) {
        console.log(123);
        throw new HttpException(
          'One of the users was not found',
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        'Failed to create friendship',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('get_friend')
  @ApiOperation({ summary: '查找好友关系' })
  async get_friend(@Body() createFriendDto) {
    const { userId } = createFriendDto;
    try {
      const res = await this.friendService.getFriendsForUser(userId);
      return res;
    } catch (error) {
      if (error instanceof NotFoundException) {
        console.log(123);
        throw new HttpException(
          'One of the users was not found',
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        'Failed to create friendship',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
