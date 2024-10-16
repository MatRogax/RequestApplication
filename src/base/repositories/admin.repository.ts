import { PrismaService } from "@database/prisma.service";
import { UpdateAdminDto } from "@dtos/update.admin";
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Admin } from "@prisma/client";

@Injectable()
export class AdminRepository {
    constructor(
        private readonly prisma: PrismaService,
        // private readonly hashService: HashService
    ) { }

    async createAdmin(admin: Admin): Promise<Admin> {
        try {
            const CreateAdmin = await this.prisma.admin.create({ data: admin })
            return CreateAdmin;
        } catch (error) {
            throw new BadRequestException("erro ao criar Usuario Admin $");
        }
    }

    async updateAdmin(id: string, updateData: UpdateAdminDto): Promise<Admin> {
        const existingAdmin = await this.findAdminById(id);

        if (!this.isUUID(id)) {
            throw new BadRequestException('ID fornecido não é um UUID válido.');
        }

        if (existingAdmin) {
            try {
                const updatedAdmin = await this.prisma.admin.update({
                    where: { id: id },
                    data: updateData,
                });
                return updatedAdmin;

            } catch (error) {
                throw new BadRequestException(`Erro ao atualizar Informações ${error.message}`);
            }
        }
    }


    async deleteAdmin(id: string): Promise<Admin> {
        const existingAdmin = await this.findAdminById(id);

        if (!this.isUUID(id)) {
            throw new BadRequestException('ID fornecido não é um UUID válido.');
        }

        if (existingAdmin) {
            try {
                const deleteAdmin = await this.prisma.admin.delete({
                    where: { id: id },
                });
                return deleteAdmin;

            } catch (error) {
                throw new BadRequestException(`Erro ao deletar Usuário ${error.message}`);
            }
        }
    }

    async findAdminById(id: string): Promise<Admin> {
        if (!this.isUUID(id)) {
            throw new BadRequestException('ID fornecido não é válido.');
        }

        const admin = await this.prisma.admin.findUnique({
            where: { id },
        });

        if (!admin) {
            throw new NotFoundException(`usuário ${id} não foi encontrado`);
        }

        return admin;
    }

    async findAll(filters?: any) {
        try {
            return await this.prisma.admin.findMany({
                where: filters,
            });
        } catch (error) {
            throw new InternalServerErrorException(`Não foi possível buscar os usuários: ${error.message}`);
        }
    }

    async AdminExists(id: string): Promise<boolean> {
        await this.findAdminById(id);
        return true;
    }

    private isUUID(id: string): boolean {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        const isValid = uuidRegex.test(id);

        return isValid
    }
}
