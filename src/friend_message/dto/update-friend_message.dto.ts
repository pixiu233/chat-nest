import { PartialType } from '@nestjs/swagger';
import { CreateFriendMessageDto } from './create-friend_message.dto';

export class UpdateFriendMessageDto extends PartialType(CreateFriendMessageDto) {}
