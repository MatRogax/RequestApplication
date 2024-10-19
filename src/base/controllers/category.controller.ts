import { CategoryDto } from '@dtos/category.dto';
import { UpdateCategoryDto } from '@dtos/update-category';
import { Body, Controller, Delete, Get, Headers, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryRepository } from '@repositories/category.repository';

@Controller('categories')
@ApiTags('category')
export class CategoryController {
    constructor(private readonly repository: CategoryRepository) { }

    /**
     * Cria uma nova categoria
     * @param data - Dados da categoria a ser criada
     * @returns Mensagem de sucesso e os dados da categoria criada
     */
    @Post('cadastro')
    async createCategory(@Body() data: CategoryDto) {
        const createdCategory = await this.repository.createCategory(data);
        return { message: "Categoria Cadastrada com Sucesso", createdCategory };
    }

    /**
     * Busca uma categoria pelo ID
     * @param id - ID da categoria
     * @returns Mensagem de sucesso e os dados da categoria encontrada
     */
    @Get('categorie/:id')
    async getCategory(@Param('id') id: number) {
        const categoryData = await this.repository.findCategoryById(id);
        return { message: "Categoria Encontrada", categoryData };
    }

    /**
     * Busca todas as categorias
     * @returns Lista de todas as categorias
     */
    @Get('all')
    async getAllCategories() {
        const categories = await this.repository.findAllCategories();
        return categories;
    }

    /**
     * Atualiza os dados de uma categoria existente
     * @param id - ID da categoria a ser atualizada
     * @param data - Dados atualizados da categoria
     * @returns Mensagem de sucesso e os dados da categoria atualizada
     */
    @Patch('categorie/:id')
    async updateCategory(@Param('id') id: number, @Body() data: UpdateCategoryDto) {
        const updatedCategoryData = await this.repository.updateCategory(id, data);
        return { message: "Categoria Atualizada com Sucesso", updatedCategoryData };
    }

    /**
     * Deleta uma categoria pelo ID
     * @param id - ID da categoria a ser deletada
     * @returns Mensagem de sucesso e os dados da categoria deletada
     */
    @Delete('categorie/:id')
    async deleteCategory(@Param('id') id: number) {
        const deletedCategory = await this.repository.deleteCategory(id);
        return { message: `Categoria com nome ${deletedCategory.name} foi removida com sucesso.` };
    }
}
