import { UserDto } from '@dtos/user.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserRepository } from '@repositories/user.repository';

@Controller('customer')
@ApiTags('customer')
export class UserController {
    constructor(private repository: UserRepository) { }


    @Post('cadastro')
    async createCustomer(@Body() user: UserDto) {
        const createUser = await this.repository.createUser(user);
        return createUser;

    }

    @Get('users/:id')
    getUser(@Param('id') id: string) {
        return this.repository.findById(id);
    }
}
