import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  findOne(username: string): string {
    if (username === 'kid') {
      return 'kis is here';
    }
    return 'no user';
  }
}
