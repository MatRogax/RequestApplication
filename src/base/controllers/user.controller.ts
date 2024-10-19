import { UpdateUserDto } from '@dtos/update-user.dto';
import { UserDto } from '@dtos/user.dto';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserRepository } from '@repositories/user.repository';

@Controller('users')
@ApiTags('user')
export class UserController {
    constructor(private repository: UserRepository) { }

    @Post('cadastro')
    async createCustomer(@Body() user: UserDto) {
        const createUser = await this.repository.createUser(user);
        return { message: "Usuário criado com Sucesso", createUser };

    }

    @Patch('user/:id')
    async updateUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
        const updatedUserData = await this.repository.updateUser(id, data);
        return { message: "Usuário Atualizado com Sucesso", updatedUserData };
    }

    @Get('user/:id')
    getUser(@Param('id') id: string) {
        const UserData = this.repository.findById(id);
        return { message: ` Usuário encontrado com Sucesso`, UserData };
    }
    @Get('all')
    async findAll() {
        const allUsers = await this.repository.findAll();
        return allUsers;
    }

    @Delete('user/:id')
    async deleteUser(@Param('id') id: string) {
        await this.repository.deleteUser(id);
        return { message: `Usuário com ID ${id} foi removido com sucesso.` };
    }
}
