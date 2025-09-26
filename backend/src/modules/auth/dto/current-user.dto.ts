import {UserEntity} from "../../user/entities/user.entity";
import {Gender} from "../../user/domain/gender";
import {RoleType} from "../../../guards/role-type";
import type {Uuid} from "../../../common/types";
import {ApiProperty} from "@nestjs/swagger";
import { User } from "src/modules/user/domain/user";

export class CurrentUserDto {
    @ApiProperty({
        example: '550e8400-e29b-41d4-a716-446655440000',
        description: 'Unique identifier of the user'
    })
    id: Uuid;

    @ApiProperty({
        example: 'john.doe@example.com',
        description: 'Email address of the user'
    })
    email: string;

    @ApiProperty({
        example: 'John',
        description: 'First name of the user'
    })
    firstName: string;

    @ApiProperty({
        example: 'Doe',
        description: 'Last name of the user'
    })
    lastName: string;

    @ApiProperty({
        example: 'https://example.com/profile.jpg',
        description: 'Profile picture of the user'
    })
    picture?: string;

    @ApiProperty({
        example: 'John Doe',
        description: 'Full name of the user'
    })
    fullName: string;

    @ApiProperty({
        example: 'male',
        description: 'Gender of the user'
    })
    gender?: Gender;

    @ApiProperty({
        example: 'user',
        description: 'Role of the user'
    })
    role: RoleType;

    @ApiProperty({
        example: '1990-01-01',
        description: 'Birthday of the user'
    })
    birthday?: string;

    @ApiProperty({
        example: '+1234567890',
        description: 'Phone number of the user'
    })
    phoneNumber?: string;

    public static fromDomain(user: User): CurrentUserDto {
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            fullName: `${user.firstName} ${user.lastName}`,
            picture: user.picture,
            gender: user.gender,
            role: user.role || RoleType.USER,
            birthday: user.birthday,
            phoneNumber: user.phoneNumber,
        };
    }
}
