import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {UserEntity} from '../user/entities/user.entity';
import {JwtStrategy} from './jwt-strategy.service';
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {KeycloakModule} from "../keycloak/keycloak.module";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), KeycloakModule],
    controllers: [AuthController],
    providers: [JwtStrategy, AuthService],
    exports: [JwtStrategy],
})
export class AuthModule {
}
