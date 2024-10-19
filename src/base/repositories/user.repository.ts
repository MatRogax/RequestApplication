import { PrismaService } from "@database/prisma.service";
import { UpdateUserDto } from "@dtos/update-user.dto";
import { UserDto } from "@dtos/user.dto";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "@prisma/client";

@Injectable()
export class UserRepository {
    constructor(private prismaService: PrismaService) { }

    async createUser(user: UserDto): Promise<User> {
        const validEmail = user.email;
        const validCpf = user.cpf;
        const validUUI = user.id;

        const existingUser = await this.findFirstUser(validEmail, validCpf, validUUI);

        if (!existingUser) {
            try {
                const createdUser = await this.prismaService.user.create({ data: user });
                return createdUser;
            } catch (error) {
                throw new Error(`Erro ao criar o usuário: ${error.message}`);
            }
        } else {
            throw new BadRequestException('usuario já existe');
        }
    }

    async findFirstUser(email?: string, cpf?: string, id?: string): Promise<User | null> {
        try {
            const existingUser = await this.prismaService.user.findFirst({
                where: {
                    OR: [
                        email ? { email } : undefined,
                        cpf ? { cpf } : undefined,
                        id ? { id } : undefined,
                    ],
                },
            });
            return existingUser;

        } catch (error) {
            throw new Error(`Não foi possível verificar se o usuário já existe: ${error.message}`);
        }
    }
    //TODO -> fazer filtro para encontrar todos os semelhantes 
    async findAll(): Promise<User[]> {
        try {
            return await this.prismaService.user.findMany();
        } catch (error) {
            throw new Error(`Não foi possível buscar os usuários: ${error.message}`);
        }
    }

    async findById(id: string): Promise<User> {

        const user = await this.prismaService.user.findUnique({
            where: { id },
        });
        return user;
    }

    async updateUser(id: string, UserData: UpdateUserDto): Promise<User> {
        const existingUser = await this.UserExists(id);

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
        const existingUser = await this.UserExists(id);
        if (existingUser) {
            try {
                const deleteUser = await this.prismaService.user.delete({ where: { id: id } });
                return deleteUser;
            } catch (error) {
                throw new BadRequestException(`Erro ao deletar o cliente: ${error.message}`);
            }
        }
    }

    async UserExists(id: string): Promise<boolean> {
        let validExistUser = false;
        const userStatus = await this.findById(id);

        if (userStatus) {
            validExistUser = true;
        } else {
            throw new NotFoundException("Usuário não existe");
        }
        return validExistUser;
    }

}
