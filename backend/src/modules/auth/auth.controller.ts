import {Body, Controller, Get, Post} from '@nestjs/common';
import {RegisterFormDto} from './dto/register-form.dto';
import {ApiTags} from "@nestjs/swagger";
import {AuthService} from "./auth.service";
import {LoginFormDto} from "./dto/login-form.dto";
import {AuthUser} from "../../decorator/auth-user.decorator";
import {UserEntity} from "../user/entities/user.entity";
import {CurrentUserDto} from "./dto/current-user.dto";
import {RequireLoggedIn} from "../../guards/role-container";
import {AuthResultDto} from "./dto/auth-result.dto";
import {RefreshTokenFormDto} from "./dto/refresh-token-form.dto";

@ApiTags('Auths')
@Controller('auths')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('register')
    async register(@Body() registerDto: RegisterFormDto): Promise<AuthResultDto> {
        return AuthResultDto.fromAuthResult(
            await this.authService.register(
                RegisterFormDto.toRegisterForm(registerDto)
            )
        );
    }

    @Post('login')
    async login(@Body() loginDto: LoginFormDto): Promise<AuthResultDto> {
        return AuthResultDto.fromAuthResult(
            await this.authService.login(
                LoginFormDto.toLoginForm(loginDto)
            )
        );
    }

    @Post('refresh-token')
    async refreshToken(@Body() refreshTokenFormDto: RefreshTokenFormDto): Promise<AuthResultDto> {
        return AuthResultDto.fromAuthResult(await this.authService.refreshToken(
            RefreshTokenFormDto.toRefreshTokenForm(refreshTokenFormDto)
        ));
    }

    @Get('me')
    @RequireLoggedIn()
    getMe(@AuthUser() user: UserEntity): CurrentUserDto {
        return CurrentUserDto.fromUser(user);
    }
}

