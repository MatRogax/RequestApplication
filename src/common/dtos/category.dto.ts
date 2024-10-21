import { ApiProperty } from "@nestjs/swagger";
import { IsDate, isDate, IsNotEmpty, IsNumber, IsString, Length } from "class-validator"

export class CategoryDto {
    // @IsNumber()
    // @IsNotEmpty()
    // id:number;
    @IsNotEmpty()
    @IsString()
    @Length(1, 255)
    @ApiProperty({ description: 'Nome da categoria', example: 'frutas e legumes' })
    name: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 255)
    @ApiProperty({ description: 'descrição da categoria', example: 'seção de frutas e legumes' })
    description: string;

    // @IsNotEmpty()
    // @IsDate()
    // createdAt: Date;	

}