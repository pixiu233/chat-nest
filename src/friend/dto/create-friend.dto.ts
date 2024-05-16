import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFriendDto {
  @IsNotEmpty()
  @IsNumber({}, { message: 'User ID must be a valid number' })
  userId: number;

  @IsNotEmpty()
  @IsNumber({}, { message: 'Friend ID must be a valid number' })
  friendId: number;
}
