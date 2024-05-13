import {
  BadRequestException,
  HttpException,
  HttpStatus,
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
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiOperation } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    @InjectRepository(NV_Users) private readonly user: Repository<NV_Users>,
    private readonly logger: Logger,
  ) {}
  async signup(signupData: UserDto) {
    const { username } = signupData;
    const _user = await this.findByUsername(username);
    if (signupData.password !== signupData.repassword) {
      throw new NotFoundException('两次输入的密码不一致，请检查');
    }
    if (_user) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { repassword, password, ...res } = await this.user.save(signupData);
    const token = await this.createToken({
      username,
      id: res.id,
    });
    return { ...res, token };
  }
  hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10; // 哈希轮数，越高越安全但也越慢
    return bcrypt.hash(password, saltOrRounds);
  }
  //创建token
  createToken(user: Partial<NV_Users>) {
    return this.jwt.signAsync(user);
  }
  async validate(username: string, pass: string) {
    const user = await this.user.findOne({ where: { username } });

    if (!user) {
      throw new BadRequestException('用户名不正确！');
    }
    if (user) {
      const match = await bcrypt.compare(pass, user.password);
      if (match) {
        const token = await this.createToken({
          id: user.id,
          username: user.username,
        });

        this.logger.log('用户名密码认证成功');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return { ...result, token };
      }
      throw new BadRequestException('密码错误.');
    }
    throw new BadRequestException('用户名密码认证失败');
    return null;
  }
  async findByUsername(username: string) {
    return this.user.findOne({ where: { username } });
  }
  async getAll() {
    return await this.user.find();
  }
}
