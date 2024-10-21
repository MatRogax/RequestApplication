import { UpdateUserDto } from '@dtos/update-user.dto';
import { UserDto } from '@dtos/user.dto';
import { AuthGuard } from '@guards/auth.guard';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRepository } from '@repositories/user.repository';

@Controller('users')
@ApiTags('user')
export class UserController {
    constructor(private repository: UserRepository) { }

    @Post('cadastro')
    @ApiOperation({ summary: 'Criar um novo usuário' })
    @ApiResponse({ status: 201, description: 'Usuário criado com sucesso', type: UserDto })
    @ApiResponse({ status: 400, description: 'Requisição inválida' })
    async createCustomer(@Body() user: UserDto) {
        const createUser = await this.repository.createUser(user);
        return { message: "Usuário criado com Sucesso", createUser };

    }
    @Patch('user/:id')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Atualizar um usuário existente' })
    @ApiParam({ name: 'id', required: true, description: 'ID do usuário a ser atualizado' })
    @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso', type: UserDto })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
    async updateUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
        const updatedUserData = await this.repository.updateUser(id, data);
        return { message: "Usuário Atualizado com Sucesso", updatedUserData };
    }

    @Get('user/:id')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Obter detalhes de um usuário' })
    @ApiParam({ name: 'id', required: true, description: 'ID do usuário' })
    @ApiResponse({ status: 200, description: 'Usuário encontrado com sucesso', type: UserDto })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
    async getUser(@Param('id') id: string) {
        const UserData = await this.repository.findById(id);
        return { message: ` Usuário encontrado com Sucesso`, UserData };
    }


    @Get('all')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Obter todos os usuários' })
    @ApiResponse({ status: 200, description: 'Lista de usuários', type: [UserDto] })
    async findAll() {
        const allUsers = await this.repository.findAll();
        return allUsers;
    }

    @Delete('user/:id')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Deletar um usuário' })
    @ApiParam({ name: 'id', required: true, description: 'ID do usuário a ser deletado' })
    @ApiResponse({ status: 200, description: 'Usuário deletado com sucesso' })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
    async deleteUser(@Param('id') id: string) {
        await this.repository.deleteUser(id);
        return { message: `Usuário com ID ${id} foi removido com sucesso.` };
    }
}
