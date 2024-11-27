import { PartialType } from '@nestjs/mapped-types';
import { UserDto } from '@dtos/user.dto';

export class UpdateUserDto extends PartialType(UserDto) { }