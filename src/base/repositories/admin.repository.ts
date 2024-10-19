import { PrismaService } from "@database/prisma.service";
import { AdminDto } from "@dtos/admin.dto";
import { UpdateAdminDto } from "@dtos/update.admin";
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Admin } from "@prisma/client";

@Injectable()
export class AdminRepository {
    constructor(
        private readonly prisma: PrismaService,
        //Todo -> fazer pipe para hash de senha (private readonly hashService: HashService) 
    ) { }

    async createAdmin(admin: AdminDto): Promise<Admin> {
        const validEmail = admin.email;
        // const validUUID = admin.id;

        const existingAdmin = await this.findFirstAdmin(validEmail);

        if (!existingAdmin) {
            try {
                const CreateAdmin = await this.prisma.admin.create({ data: admin })
                return CreateAdmin;
            } catch (error) {
                throw new BadRequestException(`erro ao criar Usuario Admin ${error.message}`);
            }
        } else {
            throw new BadRequestException('Usuario já existe');
        }
    }

    async findFirstAdmin(email?: string, cpf?: string, id?: string): Promise<Admin | null> {
        try {
            const existingAdmin = await this.prisma.admin.findFirst({
                where: {
                    AND: [
                        email ? { email } : undefined,
                        id ? { id } : undefined,
                    ],
                },
            });
            return existingAdmin;

        } catch (error) {
            throw new Error(`Não foi possível verificar se o usuário já existe: ${error.message}`);
        }

    }

    async updateAdmin(id: string, updateData: UpdateAdminDto): Promise<Admin> {
        const existingAdmin = await this.findAdminById(id);

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
        const existingAdmin = await this.UserExists(id);

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

        const admin = await this.prisma.admin.findUnique({
            where: { id },
        });
        return admin;
    }

    //TODO -> fazer filtro para encontrar todos os semelhantes
    async findAll(): Promise<Admin[]> {
        try {
            const allAdmins = await this.prisma.admin.findMany();
            return allAdmins;
        } catch (error) {
            throw new InternalServerErrorException(`Erro ao buscar todos os administradores: ${error.message}`);
        }
    }

    async UserExists(id: string): Promise<boolean> {
        let validExistUser = false;
        const userStatus = await this.findAdminById(id);

        if (userStatus) {
            validExistUser = true;
        } else {
            throw new NotFoundException("Usuário não existe");
        }
        return validExistUser;
    }

}

