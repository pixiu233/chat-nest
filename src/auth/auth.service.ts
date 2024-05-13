import {
  Injectable,
  Logger,
  NotFoundException,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NV_Users } from './entities/auth.entity';
import { Like, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiOperation } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(NV_Users) private readonly user: Repository<NV_Users>,
    private readonly logger: Logger,
  ) {}
  signup(signupData: UserDto) {
    const user = new NV_Users();
    user.username = signupData.username;
    user.password = signupData.password;
    return this.user.save(user);
  }

  async validate(username: string, pass: string) {
    const user = await this.user.findOne({ where: { username } });
    console.log('pass', pass === user.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (user) {
      const match = await bcrypt.compare(pass, user.password);
      if (match) {
        this.logger.log('用户名密码认证成功');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
      }
      this.logger.error('密码错误.');
    }
    this.logger.error('用户名密码认证失败');
    return null;
  }
  async findByUsername(username: string) {
    return this.user.findOne({ where: { username } });
  }
}
