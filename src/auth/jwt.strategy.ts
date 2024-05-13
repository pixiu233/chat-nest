import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';

// name: 'local' 默认值，也可以自定义
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // 这里默认不用配置，假设的是你的User实体中属性名为username和password
    // 如果不是的话，需要手动指定是usernameField:xx和passwordField:xxx
    super();
  }

  async validate(username: string, password: string) {
    const user = this.authService.validate(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
