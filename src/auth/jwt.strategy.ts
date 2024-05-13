import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

/**
 * JWT策略
 *
 */

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  //对前端传递来的token进行解析
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
  async validate(payload: any) {
    return payload;
  }
}
