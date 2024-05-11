import { PartialType } from '@nestjs/swagger';
import { CreateGuardDto } from './create-guard.dto';

export class UpdateGuardDto extends PartialType(CreateGuardDto) {}
