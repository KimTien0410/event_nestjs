import { ApiProperty } from '@nestjs/swagger';
import { User } from './../domain/user';
import { UserTopRegistration } from '../domain/user-top-registration';
import type { Uuid } from '../../../common/types';

export class UserTopRegistrationDto {
    static fromEntity(arg0: { userId: any; userName: any; userEmail: any; registrationCount: number; }): any {
      throw new Error('Method not implemented.');
    }
    @ApiProperty({ example: 1, description: 'User ID' })
    userId: Uuid;

    @ApiProperty({ example: 'John Doe', description: 'User Name' })
    userName: string;

    @ApiProperty({ example: 'john.doe@example.com', description: 'User Email' })
    userEmail: string;

    @ApiProperty({ example: 5, description: 'Registration Count' })
    registrationCount: number;

    static fromDomain(userTopRegistration: UserTopRegistration): UserTopRegistrationDto {
        return {
            userId: userTopRegistration.userId,
            userName: userTopRegistration.userName,
            userEmail: userTopRegistration.userEmail,
            registrationCount: userTopRegistration.registrationCount,
        };
    }
    
    static fromDomains(userTopRegistrations: UserTopRegistration[]): UserTopRegistrationDto[] {
        return userTopRegistrations.map((userTopRegistration) => this.fromDomain(userTopRegistration));
    }

}