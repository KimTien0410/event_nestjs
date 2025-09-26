import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {InjectRepository} from '@nestjs/typeorm';
import {passportJwtSecret} from 'jwks-rsa';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {Repository} from 'typeorm';
import {Uuid} from '../../common/types';
import {ApiConfigService} from '../../shared/services/api-config.service';
import {UserEntity} from '../user/entities/user.entity';
import {RoleType} from '../../guards/role-type';
import {Gender} from "../user/domain/gender";
import { emptyUuid } from '../../utils/uuid.utils';

export const guestUser: Partial<UserEntity> = {
    id: emptyUuid,
    keyCloakId: emptyUuid,
    createdAt: new Date(),
    updatedAt: new Date(),
    firstName: 'Guest',
    lastName: 'Guest',
    email: 'Guest',
    gender: Gender.MALE,
    role: RoleType.GUEST,
    birthday: '',
    phoneNumber: '',
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private static jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

    constructor(
        config: ApiConfigService,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {
        super({
            ignoreExpiration: false,
            algorithms: ['RS256'],
            jwtFromRequest: JwtStrategy.jwtFromRequest,
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: config.keycloakJwtConfig.jwksUri,
            }),
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authenticate(req: any, options?: any) {
        const token = JwtStrategy.jwtFromRequest(req);

        if (!token) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            req.user = guestUser;
            this.success(guestUser);

            return;
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        super.authenticate(req, options);
    }

    // noinspection JSUnusedGlobalSymbols
    public async validate(args: IJwtPayload): Promise<UserEntity | null> {
        const userId = args.sub as Uuid;

        return await this.userRepository.findOneBy({
            keyCloakId: userId,
        });
    }
}

interface IJwtPayload {
    exp: number;
    iat: number;
    auth_time: number;
    jti: string;
    iss: string;
    aud: string;
    sub: string;
    typ: string;
    azp: string;
    sid: string;
    acr: string;
    realm_access: {
        roles: string[];
    };
    resource_access: {
        account: {
            roles: string[];
        };
    };
    scope: string;
    email_verified: boolean;
    name: string;
    preferred_username: string;
    given_name: string;
    family_name: string;
    email: string;
}
