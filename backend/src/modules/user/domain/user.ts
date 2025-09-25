import { RoleType } from '../../../guards/role-type';
import { Uuid } from '../../../common/types';
import { UserEntity } from '../entities/user.entity';
import { Gender } from './gender';

export class User {
  id: Uuid;

  role?: RoleType;

  keyCloakId?: Uuid | null;

  firstName: string;

  lastName: string;

  email: string;

  picture?: string | null;

  gender?: Gender | null;

  birthday?: string | null;

  phoneNumber?: string | null;

  createdAt: Date;

  updatedAt: Date;

  static fromEntity(userEntity: UserEntity): User {
    return {
      id: userEntity.id,
      role: userEntity.role,
      keyCloakId: userEntity.keyCloakId,
      firstName: userEntity.firstName,
      lastName: userEntity.lastName,
      email: userEntity.email,
      picture: userEntity.picture,
      gender: userEntity.gender,
      birthday: userEntity.birthday,
      phoneNumber: userEntity.phoneNumber,
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt,
    };
  }

  static fromEntities(entities: UserEntity[]): User[] {
    return entities.map((userEntity) => this.fromEntity(userEntity));
  }
}
