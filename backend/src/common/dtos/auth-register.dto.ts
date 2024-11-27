import { ApiProperty, PartialType } from '@nestjs/swagger';
import { UserDto } from '@dtos/user.dto';
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
export class AuthRegisterDto extends UserDto {
    @ApiProperty({
        description: 'Nome do usuário',
        example: 'João da Silva',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Email do usuário',
        example: 'usuario@example.com',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'Senha do usuário, deve ser forte',
        example: 'Senha@1234',
    })
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1,
    })
    @IsNotEmpty()
    password: string;
}
