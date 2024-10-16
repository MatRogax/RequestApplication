import { AdminDto } from '@dtos/admin.dto';
import { UpdateAdminDto } from '@dtos/update.admin';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AdminRepository } from '@repositories/admin.repository';

@Controller('admin')
export class AdminController {
    constructor(private readonly repository: AdminRepository) { }

    @Post('register')
    async createAdmin(@Body() data: AdminDto) {
        const adminData = await this.repository.createAdmin(data);
        return adminData;
    }

    @Get('users/:id')
    async getAdmin(@Param('id') id: string) {
        const adminData = await this.repository.findAdminById(id);
        return adminData;
    }

    @Patch('users/:id')
    async updateAdmin(@Param('id') id: string, @Body() data: UpdateAdminDto) {
        const updatedAdminData = await this.repository.updateAdmin(id, data);
        return updatedAdminData;
    }

    @Delete('users/:id')
    async deleteAdmin(@Param('id') id: string) {
        await this.repository.deleteAdmin(id);
        return { message: `Admin com ID ${id} foi removido com sucesso.` };
    }
}
