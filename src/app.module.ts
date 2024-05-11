import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './logical/user/user.service';
import { UserController } from './logical/user/user.controller';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [TodosModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
