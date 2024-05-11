import { Injectable } from '@nestjs/common';
import { CreateGuardDto } from './dto/create-guard.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Guard } from './entities/guard.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GuardService {
  constructor(@InjectRepository(Guard) private user: Repository<Guard>) {}

  saveUser(createGuardDto: CreateGuardDto) {
    const user = new Guard();
    user.username = createGuardDto.username;
    user.password = createGuardDto.password;
    return this.user.save(user);
  }
}
