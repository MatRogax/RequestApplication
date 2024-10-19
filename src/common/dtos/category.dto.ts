import { IsDate, isDate, IsNotEmpty, IsNumber, IsString, Length } from "class-validator"

export class CategoryDto {
    // @IsNumber()
    // @IsNotEmpty()
    // id:number;

    @IsNotEmpty()
    @IsString()
    @Length(1, 255)
    name: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 255)
    description: string;



    // @IsNotEmpty()
    // @IsDate()
    // createdAt: Date;	

}