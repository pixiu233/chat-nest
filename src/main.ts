import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  ArgumentsHost,
  CallHandler,
  Catch,
  ExceptionFilter,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
@Injectable()
export class HttpStatusSuccess implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return {
          code: HttpStatus.OK,
          message: '请求成功',
          data,
        };
      }),
    );
  }
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception.getStatus();
    const exceptionRes: any = exception.getResponse();
    const { error, message } = exceptionRes;

    const msgLog = {
      code: status,
      message,
      error,
      path: request.url,
      timestamp: new Date().toLocaleString(),
    };

    response.status(status).json(msgLog);
  }
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //swagger配置
  const options = new DocumentBuilder()
    .setTitle('管理后台')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);
  app.setGlobalPrefix('v1'); // 全局路由前缀
  app.useGlobalInterceptors(new HttpStatusSuccess()); // 全局拦截器请求成功
  app.useGlobalFilters(new HttpExceptionFilter()); // 全局异常过滤器
  app.enableCors({
    origin: 'http://localhost:8080', // 只有来自 <http://example.com> 的请求才被允许
  });

  await app.listen(3000);
}
bootstrap();
