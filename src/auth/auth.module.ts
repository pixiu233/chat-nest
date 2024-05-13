import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NV_Users } from './entities/auth.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([NV_Users]), PassportModule],
  controllers: [AuthController],
  providers: [AuthService, Logger, LocalStrategy],
})
export class AuthModule {}
