import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, IsUUID, Length } from 'class-validator';
import { IsCpf } from 'src/common/decorators/isCpf.decorator';

export class CustomerDto {
    @IsUUID() 
    id: string;
  
    @Length(1, 255) 
    @IsString()
    @IsNotEmpty() 
    name: string;

    @IsNotEmpty() 
    @IsCpf({ message: 'CPF deve ser válido.' })
    cpf: string;

    @IsEmail() 
    email: string;
  
    @IsString() 
    address: string;
  
    @IsString() 
    @Length(1, 20) 
    phone: string;
  
    @IsString() 
    @Length(10, 10) 
    date: string;
  
    @IsString() 
    @Length(8, 8) 
    hour: string;
  
    // @IsArray() 
    // @Type(() => CartDto) 
    // carts: CartDto[];
  
    // @IsArray() 
    // @Type(() => OrderDto) 
    // orders: OrderDto[];
  
    @IsNotEmpty()
    @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols:1,
    minNumbers:1
  })
    @IsString() 
    password: string; 
}


