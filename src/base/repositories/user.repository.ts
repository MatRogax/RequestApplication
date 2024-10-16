import { PrismaService } from "@database/prisma.service";
import { UpdateUserDto } from "@dtos/update-user.dto";
import { UserDto } from "@dtos/user.dto";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "@prisma/client";

//Todo -> Documentar o Service de cliente

@Injectable()
export class UserRepository {
    constructor(private prismaService: PrismaService) { }

    async createUser(user: UserDto): Promise<User> {
        try {
            const createdUser = await this.prismaService.user.create({ data: user });
            return createdUser;
        } catch (error) {
            throw new Error(`Erro ao criar o usuário: ${error.message}`);
        }
    }

    async findAll(filters?: any) {
        try {
            return await this.prismaService.user.findMany({
                where: filters,
            });
        } catch (error) {
            throw new Error(`Não foi possível buscar os usuários: ${error.message}`);
        }
    }

    async findById(id: string): Promise<User> {
        if (!this.isUUID(id)) {
            throw new BadRequestException('ID fornecido não é válido.');
        }

        const user = await this.prismaService.user.findUnique({
            where: { id },
        });

        return user;
    }


    async updateUser(id: string, UserData: UpdateUserDto): Promise<User> {
        const existingUser = await this.findById(id);

        if (existingUser) {
            try {
                const updatedUser = await this.prismaService.user.update({
                    where: { id: id },
                    data: UserData,
                });
                return updatedUser;
            } catch (error) {
                throw new BadRequestException(`Erro ao atualizar o cliente: ${error.message}`);
            }
        }
    }

    async deleteUser(id: string): Promise<User> {

        const existingUser = await this.findById(id);
        try {
            const deleteUser = await this.prismaService.user.delete({ where: { id: existingUser.id } });
            return deleteUser;
        } catch (error) {
            throw new BadRequestException(`Erro ao deletar o cliente: ${error.message}`);
        }

    }

    private isUUID(id: string): boolean {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

        const isValid = uuidRegex.test(id);
        if (!isValid) {
            console.warn(`ID fornecido não é um UUID válido: ${id}`);
        }

        return isValid;
    }


    async UserExists(id: string): Promise<User | never> {
        const user = await this.findById(id);

        if (!user) {
            throw new NotFoundException(`usuário ${id} não foi encontrado`);
        }

        return user;
    }

}
