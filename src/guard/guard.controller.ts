import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GuardService } from './guard.service';
import { CreateGuardDto } from './dto/create-guard.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdateGuardDto } from './dto/update-guard.dto';

@Controller('guard')
@ApiTags('guard模块')
export class GuardController {
  constructor(private readonly guardService: GuardService) {}
  @Post('add')
  @ApiOperation({ summary: '创建用户' })
  @ApiParam({ name: 'username', description: '用户名' })
  @ApiParam({ name: 'password', description: '密码' })
  saveUser(@Body() createGuardDto: CreateGuardDto) {
    return this.guardService.saveUser(createGuardDto);
  }
  // @Post()
  // create(@Body() createGuardDto: CreateGuardDto) {
  //   return this.guardService.create(createGuardDto);
  // }
  //
  // @Get()
  // findAll() {
  //   return this.guardService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.guardService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateGuardDto: UpdateGuardDto) {
  //   return this.guardService.update(+id, updateGuardDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.guardService.remove(+id);
  // }
}
