import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
  @ApiProperty({
    required: true,
    description: '用户名',
  })
  @ApiProperty({
    required: true,
    description: '密码',
  })
  @ApiProperty({
    required: true,
    description: '重复密码',
  })
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly username: string;
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
  @IsNotEmpty({ message: '重复密码不能为空' })
  readonly repassword: string;
  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsEmail()
  readonly email: string;
  @IsNotEmpty({ message: '手机号不能为空' })
  readonly mobilePhone: number;
  readonly role?: string | number;
}
