import { IsDate, IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class AdminDto {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 255)
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @Length(1, 255)
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 255)
    password: string;

    //TODO -> colocar campo updateAt(readonly updatedAt: string;) 
    @IsNotEmpty()
    @IsDate()
    createdAt: Date;
}
