import { AdminDto } from '@dtos/admin.dto';
import { UpdateAdminDto } from '@dtos/update.admin';
import { Body, Controller, Delete, Get, Headers, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminRepository } from '@repositories/admin.repository';

@Controller('admins')
@ApiTags('admin')
export class AdminController {
    constructor(private readonly repository: AdminRepository) { }

    @Post('cadastro')
    async createAdmin(@Body() data: AdminDto) {
        const createdAdmin = await this.repository.createAdmin(data);
        return { message: "Administrador Cadastrado com Sucesso", createdAdmin };
    }

    @Get('admin/:id')
    async getAdmin(@Param('id') id: string) {
        const adminData = await this.repository.findAdminById(id);
        return { message: "Administrador Encontrado com Sucesso", adminData };
    }

    @Get('all')
    async getallAdmins() {
        const UserAdmins = await this.repository.findAll();
        return UserAdmins;
    }

    //TODO -> fazer pipe para validação dos dados que estao sendo atualizados
    @Patch('admin/:id')
    async updateAdmin(@Param('id') id: string, @Body() data: UpdateAdminDto) {
        const updatedAdminData = await this.repository.updateAdmin(id, data);
        return { meesage: "Administrador atualizado com Sucesso", updatedAdminData };
    }

    @Delete('admin/:id')
    async deleteAdmin(@Param('id') id: string) {
        const deleteUser = await this.repository.deleteAdmin(id);
        return { message: `Admin com ID ${deleteUser.name} foi removido com sucesso.` };
    }
}
