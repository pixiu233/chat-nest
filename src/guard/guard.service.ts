import { Injectable } from '@nestjs/common';
import { CreateGuardDto } from './dto/create-guard.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Guard } from './entities/guard.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class GuardService {
  constructor(@InjectRepository(Guard) private user: Repository<Guard>) {}

  saveUser(createGuardDto: CreateGuardDto) {
    const user = new Guard();
    user.username = createGuardDto.username;
    user.password = createGuardDto.password;
    return this.user.save(user);
  }
  async search(username: string, page: number = 1, size: number = 10) {
    const data = await this.user.findAndCount({
      where: {
        username: Like(`%${username}%`),
      },
      skip: (page - 1) * size,
      take: size,
    });
    return {
      list: data[0],
      total: data[1],
    };
  }
}
