import { User } from 'src/modules/user/domain/user';
import { Gender } from './../../user/domain/gender';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export class UpdateProfileForm {
    firstName?: string;

    lastName?: string;

    picture?: string;

    gender?: Gender;

    birthday?: string;

    phoneNumber?: string;

    static toEntity(updateProfileForm: UpdateProfileForm): Partial<UserEntity> {
        return {
            firstName: updateProfileForm.firstName,
            lastName: updateProfileForm.lastName,
            picture: updateProfileForm.picture,
            gender: updateProfileForm.gender,
            birthday: updateProfileForm.birthday,
            phoneNumber: updateProfileForm.phoneNumber,
        };
    }
}