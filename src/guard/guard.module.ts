import { Module } from '@nestjs/common';
import { GuardService } from './guard.service';
import { GuardController } from './guard.controller';
import { Guard } from './entities/guard.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Guard])],
  controllers: [GuardController],
  providers: [GuardService],
})
export class GuardModule {}
