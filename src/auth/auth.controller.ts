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
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@ApiTags('auth模块')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  @UsePipes(ValidationPipe) // 使用管道验证
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 201, type: [UserDto] })
  @ApiOperation({ summary: '注册用户' })
  @ApiParam({ name: 'username', description: '用户名' })
  @ApiParam({ name: 'password', description: '密码' })
  async signup(@Body() signupData: UserDto) {
    return this.authService.signup(signupData);
  }

  @ApiOperation({ summary: '登录' })
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

  @ApiOperation({ summary: '获取用户信息' })
  @ApiBearerAuth() // swagger文档设置token
  @UseGuards(AuthGuard('jwt'))
  @Get('getUserInfo')
  async getUserInfo(@Request() req) {
    return req.user;
  }
  @ApiOperation({ summary: '获取所有用户' })
  @Get('list')
  @UseGuards(AuthGuard('jwt'))
  async getOne() {
    return await this.authService.getAll();
  }
}
