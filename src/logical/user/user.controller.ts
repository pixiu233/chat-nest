import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('find-one')
  findOne(@Body() body: any) {
    return this.userService.findOne(body.username);
  }
}
