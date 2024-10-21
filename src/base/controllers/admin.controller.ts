import { AdminDto } from '@dtos/admin.dto';
import { UpdateAdminDto } from '@dtos/update.admin';
import { AuthGuard } from '@guards/auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminRepository } from '@repositories/admin.repository';

@Controller('admins')
@ApiTags('admin')
export class AdminController {
  constructor(private readonly repository: AdminRepository) {}

  @Post('cadastro')
  @ApiOperation({ summary: 'Cadastrar um novo administrador' })
  @ApiResponse({
    status: 201,
    description: 'Administrador cadastrado com sucesso',
    type: AdminDto,
  })
  @ApiResponse({ status: 400, description: 'Requisição inválida' })
  async createAdmin(@Body() data: AdminDto) {
    const createdAdmin = await this.repository.createAdmin(data);
    return { message: 'Administrador Cadastrado com Sucesso', createdAdmin };
  }

  @Get('admin/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Obter detalhes de um administrador' })
  @ApiParam({ name: 'id', required: true, description: 'ID do administrador' })
  @ApiResponse({
    status: 200,
    description: 'Administrador encontrado com sucesso',
    type: AdminDto,
  })
  @ApiResponse({ status: 404, description: 'Administrador não encontrado' })
  async getAdmin(@Param('id') id: string) {
    const adminData = await this.repository.findAdminById(id);
    return { message: 'Administrador Encontrado com Sucesso', adminData };
  }

  @Get('all')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Obter todos os administradores' })
  @ApiResponse({
    status: 200,
    description: 'Lista de administradores',
    type: [AdminDto],
  })
  async getallAdmins() {
    const UserAdmins = await this.repository.findAll();
    return UserAdmins;
  }

  //TODO -> fazer pipe para validação dos dados que estao sendo atualizados
  @Patch('admin/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Atualizar um administrador existente' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID do administrador a ser atualizado',
  })
  @ApiResponse({
    status: 200,
    description: 'Administrador atualizado com sucesso',
    type: AdminDto,
  })
  @ApiResponse({ status: 404, description: 'Administrador não encontrado' })
  async updateAdmin(@Param('id') id: string, @Body() data: UpdateAdminDto) {
    const updatedAdminData = await this.repository.updateAdmin(id, data);
    return {
      meesage: 'Administrador atualizado com Sucesso',
      updatedAdminData,
    };
  }

  @Delete('admin/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Deletar um administrador' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID do administrador a ser deletado',
  })
  @ApiResponse({
    status: 200,
    description: 'Administrador deletado com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Administrador não encontrado' })
  async deleteAdmin(@Param('id') id: string) {
    const deleteUser = await this.repository.deleteAdmin(id);
    return {
      message: `Admin com ID ${deleteUser.name} foi removido com sucesso.`,
    };
  }
}
