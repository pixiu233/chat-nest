import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// 异常抛出封装
@Injectable()
export class HttpStatusError {
  static fail(error, status = HttpStatus.BAD_REQUEST) {
    throw new HttpException(
      { code: status, message: '请求失败', error },
      status,
    );
  }
}
