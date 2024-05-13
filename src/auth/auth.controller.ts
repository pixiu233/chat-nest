import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  NotFoundException,
  Get,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
@ApiTags('auth模块')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  // @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe) // 使用管道验证
  @ApiOperation({ summary: '注册用户' })
  @ApiParam({ name: 'username', description: '用户名' })
  @ApiParam({ name: 'password', description: '密码' })
  signup(@Body() signupData: UserDto) {
    return this.authService.signup(signupData);
  }
  @Get(':username')
  async getUserByUsername(@Param('username') username: string) {
    const user = await this.authService.findByUsername(username);
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return user;
  }

  @ApiOperation({ summary: '登录' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }
  //
  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
