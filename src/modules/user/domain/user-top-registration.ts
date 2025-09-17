import { UserEntity } from "../entities/user.entity";

export class UserTopRegistration {
    userId: number;

    userName: string;

    userEmail: string;

    registrationCount: number;

    constructor(
        userId: number,
        userName: string,
        userEmail: string,
        registrationCount: number,
    ) {
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.registrationCount = registrationCount;
    }

    static fromEntity(userEntity: UserEntity, registrationCount: number): UserTopRegistration {
        return new UserTopRegistration(
            userEntity.id,
            userEntity.name,
            userEntity.email,
            registrationCount,
        );
    }

    static fromEntities(userEntities: UserEntity[], registrationCounts: number[]): UserTopRegistration[] {
        return userEntities.map((userEntity, index) => this.fromEntity(userEntity, registrationCounts[index]));
    }

}