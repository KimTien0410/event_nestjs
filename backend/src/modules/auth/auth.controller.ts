import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import { RegisterFormDto } from './dto/register-form.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginFormDto } from './dto/login-form.dto';
import { AuthUser } from '../../decorator/auth-user.decorator';
import { UserEntity } from '../user/entities/user.entity';
import { CurrentUserDto } from './dto/current-user.dto';
import { RequireLoggedIn } from '../../guards/role-container';
import { AuthResultDto } from './dto/auth-result.dto';
import { RefreshTokenFormDto } from './dto/refresh-token-form.dto';
import { UserUpdateDto } from '../user/dto/user-update.dto';
import { UpdateProfileForm } from './domain/update-profile-form';
import { UpdateProfileFormDto } from './dto/update-profile-form.dto';

@ApiTags('Auths')
@Controller('auths')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterFormDto): Promise<AuthResultDto> {
    return AuthResultDto.fromAuthResult(
      await this.authService.register(
        RegisterFormDto.toRegisterForm(registerDto),
      ),
    );
  }

  @Post('login')
  async login(@Body() loginDto: LoginFormDto): Promise<AuthResultDto> {
    return AuthResultDto.fromAuthResult(
      await this.authService.login(LoginFormDto.toLoginForm(loginDto)),
    );
  }

  @Post('refresh-token')
  async refreshToken(
    @Body() refreshTokenFormDto: RefreshTokenFormDto,
  ): Promise<AuthResultDto> {
    return AuthResultDto.fromAuthResult(
      await this.authService.refreshToken(
        RefreshTokenFormDto.toRefreshTokenForm(refreshTokenFormDto),
      ),
    );
  }

  @Get('me')
  @RequireLoggedIn()
  getMe(@AuthUser() user: UserEntity): CurrentUserDto {
    return CurrentUserDto.fromDomain(user);
  }

  @Put('update-profile')
  @RequireLoggedIn()
  async updateProfile(
    @AuthUser() user: UserEntity,
    @Body() updateProfileFormDto: UpdateProfileFormDto,
  ): Promise<CurrentUserDto> {
    const updateProfileForm =
      UpdateProfileFormDto.toUpdateProfileForm(updateProfileFormDto);
    const updatedUser = await this.authService.updateProfile(
      user.id,
      updateProfileForm,
    );

    return CurrentUserDto.fromDomain(updatedUser);
  }
}
