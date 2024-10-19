import { IsCpf } from '@decorators/isCpf.decorator';
import { IsDate, IsEmail, IsNotEmpty, IsString, IsStrongPassword, IsUUID, Length } from 'class-validator';

export class UserDto {

  @IsUUID()
  id: string;

  @Length(1, 255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsCpf({ message: 'CPF deve ser válido.' })
  cpf: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
    minNumbers: 1
  })
  password: string;

  @IsString()
  address: string;

  @IsString()
  @Length(1, 20)
  phone: string;

  // @IsDate()
  // createdAt: Date
}


