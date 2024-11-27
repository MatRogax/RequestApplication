import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CategoryDto } from '@dtos/category.dto';
import { UpdateCategoryDto } from '@dtos/update-category';
import { CategoryRepository } from '@repositories/category.repository';
import { Category } from '@prisma/client';
import { AuthGuard } from '@guards/auth.guard';

@ApiTags('Category')
@UseGuards(AuthGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  @Post('create')
  @ApiOperation({ summary: 'Cria uma nova categoria' })
  @ApiBody({ type: CategoryDto })
  @ApiResponse({
    status: 201,
    description: 'Categoria criada com sucesso.',
    type: Promise<Category>,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao criar a categoria ou categoria já existente.',
  })
  async createCategory(@Body() category: CategoryDto) {
    const createdCategory =
      await this.categoryRepository.createCategory(category);
    return { message: 'Categoria Cadastrada com Sucesso', createdCategory };
  }

  @Get('especific/:id')
  @ApiOperation({ summary: 'Busca uma categoria pelo ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID da categoria a ser buscada',
  })
  @ApiResponse({
    status: 200,
    description: 'Categoria encontrada.',
    type: CategoryDto,
  })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada.' })
  async getCategory(@Param('id') id: string) {
    const categoryData = await this.categoryRepository.findCategoryById(
      parseInt(id),
    );
    return { message: 'Categoria Encontrada', categoryData };
  }

  @Get('all')
  @ApiOperation({ summary: 'Busca todas as categorias' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todas as categorias.',
    type: [CategoryDto],
  })
  @ApiResponse({ status: 500, description: 'Erro ao buscar as categorias.' })
  async getAllCategories() {
    const categories = await this.categoryRepository.findAllCategories();
    return categories;
  }

  @Patch('especific/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Atualiza uma categoria' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID da categoria a ser atualizada',
  })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({
    status: 200,
    description: 'Categoria atualizada com sucesso.',
    type: CategoryDto,
  })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada.' })
  @ApiResponse({ status: 400, description: 'Erro ao atualizar a categoria.' })
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategory: UpdateCategoryDto,
  ) {
    const updatedCategoryData = await this.categoryRepository.updateCategory(
      parseInt(id),
      updateCategory,
    );
    return { message: 'Categoria Atualizada com Sucesso', updatedCategoryData };
  }

  @Delete('especific/:id')
  @ApiOperation({ summary: 'Deleta uma categoria' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID da categoria a ser deletada',
  })
  @ApiResponse({
    status: 200,
    description: 'Categoria deletada com sucesso.',
    type: CategoryDto,
  })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada.' })
  @ApiResponse({ status: 400, description: 'Erro ao deletar a categoria.' })
  async deleteCategory(@Param('id') id: string) {
    const deletedCategory = await this.categoryRepository.deleteCategory(
      parseInt(id),
    );
    return {
      message: `Categoria ${deletedCategory.name} foi removida com sucesso.`,
    };
  }
}
