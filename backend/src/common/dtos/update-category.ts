import { PartialType } from '@nestjs/mapped-types';
import { CategoryDto } from '@dtos/category.dto';

export class UpdateCategoryDto extends PartialType(CategoryDto) { }