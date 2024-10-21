import { PartialType } from '@nestjs/mapped-types';
import { AdminDto } from '@dtos/admin.dto';

export class UpdateAdminDto extends PartialType(AdminDto) { }