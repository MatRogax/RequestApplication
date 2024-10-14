import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { AdminDto } from "./dto/admin.dto";

@Injectable()
export class AdminService {
    constructor(
        private readonly prisma: PrismaService,
        // private readonly hashService: HashService
    ) { }


    async createAdmin(admin: AdminDto): Promise<AdminDto> {
        return admin
    }

    async findAdminById(id: string): Promise<AdminDto> {

        const existingAdmin = await this.AdminExists(id);

        if (!this.isUUID(id)) {
            throw new BadRequestException('ID fornecido não é válido.');
        } else if (existingAdmin) {
            try {
                const admin = await this.prisma.admin.findUnique({
                    where: { id },
                });

            } catch (error) {
                throw new Error(`Erro ao buscar o administrador: ${error.message}`);

            }

        }




    }

    async AdminExists(id: string): Promise<boolean> {
        let exists = false;
        const admin = await this.findAdminById(id);

        if (admin) {
            exists = true;
        } else if (!admin) {
            throw new NotFoundException(`usuário ${id} não foi encontrado`);
        }

        return exists;
    }
    private isUUID(id: string): boolean {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        const isValid = uuidRegex.test(id);
        if (!isValid) {
            console.warn(`ID fornecido não é um UUID válido: ${id}`);
        }
        return isValid;
    }
}