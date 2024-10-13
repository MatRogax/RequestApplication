import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CustomerDto } from "./dto/customer.dto";

@Injectable()
export class CustomerService {
    constructor(private prismaService: PrismaService) { }
    
    async create(customer: CustomerDto) {
        try {
            return await this.prismaService.customer.create({ data: customer });
        } catch (error) {
            throw new Error('Erro ao criar o usuário: ' + error.message);
        }
    }

    async findAll(filters?: any) {
        try {
            return await this.prismaService.customer.findMany({
                where: filters, 
            });
        } catch (error) {
            throw new Error('Não foi possível buscar os clientes.');
        }
    }

    async findByIdentifier(identifier: string) {
        const isUUID = this.isUUID(identifier);
        
        if (isUUID) {
            return this.prismaService.customer.findUnique({
                where: { id: identifier }, 
        });

        }
    }

    private isUUID(id: string): boolean {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    
        const isValid = uuidRegex.test(id);
        if (!isValid) {
            console.warn('Identificador fornecido não é um UUID válido:', id);
        }
    
        return isValid;
    }
    
    
}
