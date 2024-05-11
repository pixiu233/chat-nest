import { ApiProperty } from '@nestjs/swagger';

export class CreateGuardDto {
  @ApiProperty({
    required: true,
    description: '用户名',
  })
  username: string;

  @ApiProperty({
    required: true,
    description: '密码',
  })
  password: string;
}
