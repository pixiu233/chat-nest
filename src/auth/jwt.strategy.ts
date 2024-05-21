import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { Repository } from 'typeorm';
import { NV_Users } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

/**
 * JWT策略
 *
 */

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  //对前端传递来的token进行解析
  @InjectRepository(NV_Users)
  private authService: AuthService;
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //校验逻辑token 已封装
      ignoreExpiration: false,
      secretOrKey: configService.get('SECRET'),
    });
  }

  /**
   * 验证token
   * @param payload
   */
  async validate(payload) {
    const { userId, username } = payload;
    console.log(12312, payload, userId);
    return { userId, username };
  }
}
