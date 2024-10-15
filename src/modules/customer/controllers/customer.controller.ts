import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomerService } from '../customer.service';
import { CustomerDto } from '../dto/customer.dto';

@Controller('customer')
@ApiTags('customer')
export class CustomerController {
    constructor(private repository: CustomerService) { }
    

    @Post('cadastro')
    async createCustomer(@Body() customer: CustomerDto) {

        await this.repository.create(customer);
        
    }

    @Get('users/:id')
    getUser(@Param('id') id: string) {
        return this.repository.findById(id);
    }
}
    