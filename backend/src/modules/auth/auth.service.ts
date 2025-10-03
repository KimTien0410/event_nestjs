import { ApiConfigService } from './../../shared/services/api-config.service';
import { UserUpdate } from './../user/domain/user-update';
import { RegisterForm } from './domain/register-form';
import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { KeycloakService } from '../keycloak/keycloak.service';
import { UserEntity } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger, Repository } from 'typeorm';
import { LoginForm } from './domain/login-form';
import { AuthResult } from './domain/auth-result';
import { RefreshTokenForm } from './domain/refresh-token-form';
import { Token } from './domain/token';
import { Uuid } from '../../common/types';
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from './domain/token-payload';
import { User } from '../user/domain/user';
import { UpdateProfileForm } from './domain/update-profile-form';
import { GoogleTokenForm } from './domain/google-token-form';
import { OAuth2Client } from 'google-auth-library';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  constructor(
    private readonly keycloakService: KeycloakService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly apiConfigService: ApiConfigService,
  ) {
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: this.apiConfigService.firebaseConfig.projectId,
          clientEmail: this.apiConfigService.firebaseConfig.clientEmail,
          privateKey: (
            this.apiConfigService.firebaseConfig.privateKey ?? ''
          ).replace(/\\n/g, '\n'),
        }),
      });
    }
  }

  async register(registerForm: RegisterForm): Promise<AuthResult> {
    if (await this.userRepository.findOneBy({ email: registerForm.email })) {
      throw new BadRequestException(
        `Email ${registerForm.email} đã được sử dụng`,
      );
    }

    const { id } = await this.keycloakService.createUser({
      email: registerForm.email,
      firstName: registerForm.firstName,
      lastName: registerForm.lastName,
      password: registerForm.password,
    });

    const user = await this.userRepository.save({
      keyCloakId: id,
      ...registerForm,
    });

    const token = await this.keycloakService.login({
      email: registerForm.email,
      password: registerForm.password,
    });

    return {
      user,
      token,
    };
  }

  async login(login: LoginForm): Promise<AuthResult> {
    return await this.createTokenForUser(
      await this.keycloakService.login(login),
    );
  }

  async refreshToken(refreshTokenForm: RefreshTokenForm): Promise<AuthResult> {
    return await this.createTokenForUser(
      await this.keycloakService.refreshAccessToken(
        refreshTokenForm.refreshToken,
      ),
    );
  }

  async googleLogin(googleTokenForm: GoogleTokenForm): Promise<AuthResult> {
    const decodedToken = await admin
      .auth()
      .verifyIdToken(googleTokenForm.idToken);

    const { uid, email, name, picture } = decodedToken;

    if (!email) {
      throw new BadRequestException('Email not found in token');
    }

    const keycloakToken = await this.keycloakService.googleLogin(
      googleTokenForm.accessToken,
    );

    return await this.createTokenForUser(keycloakToken, {
      firstName: name?.split(' ')[0],
      lastName: name?.split(' ').slice(1).join(' '),
      picture,
    });
  }

  async updateProfile(
    userId: Uuid,
    updateProfileForm: UpdateProfileForm,
  ): Promise<User> {
    return User.fromEntity(
      await this.userRepository.save({
        id: userId,
        ...UpdateProfileForm.toEntity(updateProfileForm),
      }),
    );
  }

  private async createTokenForUser(
    token: Token,
    userOptional: Partial<UserEntity> = {},
  ): Promise<AuthResult> {
    const tokenPayload = jwtDecode<TokenPayload>(token.accessToken);

    const user = await this.userRepository.save({
      ...(await this.findOrCreateUser(tokenPayload.sub)),
      ...this.extractUserInfoFromToken(tokenPayload),
      ...userOptional,
    });

    return {
      user,
      token,
    };
  }

  private extractUserInfoFromToken(token: TokenPayload): Partial<UserEntity> {
    return {
      email: token.email,
      firstName: token.given_name,
      lastName: token.family_name,
    };
  }

  private async findOrCreateUser(keyCloakId: Uuid): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({
      keyCloakId,
    });

    return (
      user ??
      this.userRepository.create({
        keyCloakId,
      })
    );
  }
}
