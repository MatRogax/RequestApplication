import { PrismaService } from '@database/prisma.service';
import { CategoryDto } from '@dtos/category.dto';
import { UpdateCategoryDto } from '@dtos/update-category';
import { BadRequestException, Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryRepository {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async createCategory(category: CategoryDto): Promise<Category> {
        const validCategoryName = category.name;
        const existingCategory = await this.findFirstCategory(validCategoryName);

        if (!existingCategory) {
            try {
                const createdCategory = await this.prisma.category.create({ data: category });
                return createdCategory;
            } catch (error) {
                throw new BadRequestException(`Erro ao criar categoria: ${error.message}`);
            }
        } else {
            throw new BadRequestException('Categoria já existe');
        }
    }

    async findFirstCategory(name?: string): Promise<Category | null> {
        try {
            const existingCategory = await this.prisma.category.findFirst({
                where: { name: name ? name : undefined },
            });
            return existingCategory;
        } catch (error) {
            throw new Error(`Não foi possível verificar se a categoria já existe: ${error.message}`);
        }
    }

    async updateCategory(id: number, updateData: UpdateCategoryDto): Promise<Category> {
        const existingCategory = await this.categoryExists(id);

        if (existingCategory) {
            try {
                const updatedCategory = await this.prisma.category.update({
                    where: { id },
                    data: updateData,
                });
                return updatedCategory;
            } catch (error) {
                throw new BadRequestException(`Erro ao atualizar categoria: ${error.message}`);
            }
        }
    }

    async deleteCategory(id: number): Promise<Category> {
        const existingCategory = await this.categoryExists(id);

        if (existingCategory) {
            try {
                const deletedCategory = await this.prisma.category.delete({
                    where: { id },
                });
                return deletedCategory;
            } catch (error) {
                throw new BadRequestException(`Erro ao deletar categoria: ${error.message}`);
            }
        }
    }

    async findCategoryById(id: number): Promise<Category | null> {
        try {
            const category = await this.prisma.category.findUnique({
                where: { id },
            });
            return category;
        } catch (error) {
            throw new NotFoundException(`Categoria não encontrada: ${error.message}`);
        }
    }

    async findAllCategories(): Promise<Category[]> {
        try {
            const allCategories = await this.prisma.category.findMany();
            return allCategories;
        } catch (error) {
            throw new InternalServerErrorException(`Erro ao buscar todas as categorias: ${error.message}`);
        }
    }

    async categoryExists(id: number): Promise<boolean> {
        const category = await this.findCategoryById(id);

        if (category) {
            return true;
        } else {
            throw new NotFoundException('Categoria não existe');
        }
    }
}
