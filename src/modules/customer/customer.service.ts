import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CustomerDto } from "./dto/customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";

//Todo -> Documentar o Service de cliente

@Injectable()
export class CustomerService {
    constructor(private prismaService: PrismaService) { }
    
    async create(customer: CustomerDto) {
        try {
            return await this.prismaService.customer.create({ data: customer });
        } catch (error) {
            throw new Error(`Erro ao criar o usuário: ${error.message}`);
        }
    }

    async findAll(filters?: any) {
        try {
            return await this.prismaService.customer.findMany({
                where: filters, 
            });
        } catch (error) {
            throw new Error(`Não foi possível buscar os usuários: ${error.message}`);
        }
    }

    async findById(id: string): Promise<CustomerDto> {
        if (!this.isUUID(id)) {
          throw new BadRequestException('ID fornecido não é válido.');
        }
    
        const customer = await this.prismaService.customer.findUnique({
          where: { id },
        });
        
        return customer;
    }
    

    async update(id: string, customerData: UpdateCustomerDto): Promise<UpdateCustomerDto> {
        
        const existingCustomer = await this.findById(id);
    
        try {
            const updatedCustomer = await this.prismaService.customer.update({
              where: { id: existingCustomer.id },
              data: customerData,
            });
            return updatedCustomer;
        } catch (error) {
            throw new Error(`Erro ao atualizar o cliente: ' ${error.message}`);
        }
    }

    async delete(id: string) {

        const existingCustomer = await this.findById(id);
        try {
            const deleteCustomer = await this.prismaService.customer.delete({ where: { id: existingCustomer.id } });
            return deleteCustomer;
        } catch (error) {
            throw new Error(`Erro ao deletar o cliente: ${error.message}`);
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

    async customerExists(id: string): Promise<CustomerDto | never> {
        const customer = await this.findById(id);
        
        if (!customer) {
          throw new NotFoundException(`usuário ${id} não foi encontrado`);
        }
      
        return customer;
    }
        
}
