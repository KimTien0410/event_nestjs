import {IsEmail, IsString, Min, MinLength} from "class-validator";
import {LoginForm} from "../domain/login-form";
import _ from "lodash";
import { ApiProperty } from "@nestjs/swagger";

export class LoginFormDto {
    @ApiProperty({
        example: 'john.doe@example.com',
        description: 'Email address of the user',
    })
    @IsEmail()
    @IsString()
    email: string;

    @ApiProperty({
        example: 'securePassword123',
        description: 'Password for the user account (minimum 6 characters)',
    })
    @IsString()
    @MinLength(6)
    password: string;

    public static toLoginForm(loginFormDto: LoginFormDto): LoginForm {
        return {
          email: _.toLower(loginFormDto.email),
          password: loginFormDto.password
        };
    }
}
