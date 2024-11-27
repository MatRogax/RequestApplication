import { IsDate, IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AdminDto {
    // @IsNotEmpty()
    // @IsString()
    // id: string;

    @ApiProperty({
        description: 'Nome do administrador',
        example: 'Matheus Rogato',
        maxLength: 255,
    })
    @IsNotEmpty()
    @IsString()
    @Length(1, 255)
    name: string;

    @ApiProperty({
        description: 'Email do administrador',
        example: 'joao.silva@example.com',
        maxLength: 255,
    })
    @IsNotEmpty()
    @IsEmail()
    @Length(1, 255)
    email: string;

    @ApiProperty({
        description: 'Senha do administrador (mínimo 8 caracteres)',
        example: '********',
        minLength: 8,
        maxLength: 255,
    })
    @IsNotEmpty()
    @IsString()
    @Length(8, 255)
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1
    })
    password: string;

    //TODO -> colocar campo updateAt(readonly updatedAt: string;) 
    // @IsNotEmpty()
    // @IsDate()
    // createdAt: Date;
}
