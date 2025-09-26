import {UserEntity} from "../../user/entities/user.entity";
import {Token} from "./token";

export class AuthResult {

    token: Token;


    user: UserEntity;
}
