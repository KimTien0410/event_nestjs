import {Token} from "../domain/token";

export class TokenDto {
    accessToken: string;
    expiresIn: number;
    refreshExpiresIn: number;
    refreshToken: string;
    tokenType: string;
    sessionState: string;
    scope: string;

    public static fromToken(token: Token): TokenDto {
        return {
            accessToken: token.accessToken,
            expiresIn: token.expiresIn,
            refreshExpiresIn: token.refreshExpiresIn,
            refreshToken: token.refreshToken,
            tokenType: token.tokenType,
            sessionState: token.sessionState,
            scope: token.scope,
        };
    }
}
