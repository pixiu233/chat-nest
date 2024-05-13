import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './logical/user/user.service';
import { UserController } from './logical/user/user.controller';
import { TodosModule } from './todos/todos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuardModule } from './guard/guard.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TodosModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '116.205.181.242',
      port: 3306,
      username: 'root',
      password: 'f3a9bc8c22937d5c',
      database: 'todos',
      entities: ['dist/**/entities/*.entity{.ts,.js}'],
      synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库
      retryDelay: 500, //重试连接数据库间隔
      retryAttempts: 10, //重试连接数据库的次数
      autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
    }),
    GuardModule,
    AuthModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
