import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNotEmpty, IsString, IsStrongPassword, IsUUID, Length, MaxLength } from 'class-validator';

export class UserDto {

  // @IsUUID()
  // id: string;

  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João da Silva',
    maxLength: 255,
  })
  @Length(1, 255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'CPF do usuário, deve ser um número válido',
    example: '12345678901',
    maxLength: 11,
  })
  @IsNotEmpty()
  @MaxLength(11)
  @IsString()
  // TODO: fazer decorator para validação do CPF @IsCpf({ message: 'CPF deve ser válido.' }) 
  cpf: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'usuario@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário, deve ser forte',
    example: 'Senha@1234',
  })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
    minNumbers: 1,
  })
  password: string;

  @ApiProperty({
    description: 'Endereço do usuário',
    example: 'Rua das Flores, 123',
  })
  @IsString()
  address: string;

  @ApiProperty({
    description: 'Telefone do usuário',
    example: '(11) 91234-5678',
    maxLength: 20,
  })
  @IsString()
  @Length(1, 20)
  phone: string;

  // @ApiProperty({
  //   description: 'Data de criação do usuário',
  // })
  // @IsDate()
  // createdAt: Date;
}
