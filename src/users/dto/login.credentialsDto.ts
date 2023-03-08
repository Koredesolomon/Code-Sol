import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class LoginCredentialsDto {
    @IsEmail({}, { message: 'Email is invalid' })
    email: string;

    @IsString({ message: 'Password is invalid' })
    password: string;
}