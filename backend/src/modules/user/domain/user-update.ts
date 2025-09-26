import { UserEntity } from '../entities/user.entity';
import { Gender } from './gender';

export class UserUpdate {
  firstName?: string;

  lastName?: string;

  picture?: string;

  gender?: Gender;

  birthday?: string;

  phoneNumber?: string;

  static toEntity(userUpdate: UserUpdate): Partial<UserEntity> {
    return {
      firstName: userUpdate.firstName,
      lastName: userUpdate.lastName,
      picture: userUpdate.picture,
      gender: userUpdate.gender,
      birthday: userUpdate.birthday,
      phoneNumber: userUpdate.phoneNumber,
    };
  }
}
