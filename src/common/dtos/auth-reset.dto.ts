import { IsJWT, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";

export class AuthResetDto {
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1,
    })
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsJWT()
    @MinLength(36)
    token: string;
}