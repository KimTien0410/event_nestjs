import { UserEntity } from '../entities/user.entity';
import { Gender } from './gender';

export class UserCreate {
  firstName: string;

  lastName: string;

  email: string;

  picture?: string;

  gender?: Gender;

  birthday?: string;

  phoneNumber?: string;

  static toEntity(userCreate: UserCreate): Partial<UserEntity> {
    return {
      firstName: userCreate.firstName,
      lastName: userCreate.lastName,
      email: userCreate.email,
      picture: userCreate.picture,
      gender: userCreate.gender,
      birthday: userCreate.birthday,
      phoneNumber: userCreate.phoneNumber,
    };
  }
}
