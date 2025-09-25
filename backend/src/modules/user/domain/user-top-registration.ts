import { Uuid } from "../../../common/types";
import { UserEntity } from "../entities/user.entity";

export class UserTopRegistration {
    userId: Uuid;

    userName: string;

    userEmail: string;

    registrationCount: number;

    static fromEntity(userEntity: UserEntity, registrationCount: number): UserTopRegistration {
        return {
            userId: userEntity.id,
            userName: userEntity.email,
            userEmail: userEntity.email,
            registrationCount
        };
    }

    static fromEntities(userEntities: UserEntity[], registrationCounts: number[]): UserTopRegistration[] {
        return userEntities.map((userEntity, index) => this.fromEntity(userEntity, registrationCounts[index]));
    }

}