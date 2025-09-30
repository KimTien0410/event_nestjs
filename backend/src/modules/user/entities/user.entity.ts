import {
  Column,
  Entity,
  OneToMany,
} from 'typeorm';
import { Gender } from '../domain/gender';
import { RoleType } from '../../../guards/role-type';
import type { Uuid } from '../../../common/types';
import { AbstractEntity } from '../../../common/abstract.entity';
import { AttendanceEntity } from '../../attendance/entities/attendance.entity';
import { User } from '../domain/user';

@Entity('users')
export class UserEntity extends AbstractEntity {
  @Column({ unique: true, nullable: true, name: 'key_cloak_id' })
  keyCloakId?: Uuid;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ nullable: true })
  picture?: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: Gender,
    nullable: true,
  })
  gender?: Gender;

  @Column({
    type: 'enum',
    enum: RoleType,
    default: RoleType.USER,
  })
  role: RoleType;

  @Column({ type: 'date', nullable: true })
  birthday?: string;

  @Column({ nullable: true, name: 'phone_number' })
  phoneNumber?: string;

  @OneToMany(
    () => AttendanceEntity,
    (attendanceEntity) => attendanceEntity.user,
    { onDelete: 'CASCADE' },
  )
  attendances: AttendanceEntity[];

  static fromDomain(user: User): Partial<UserEntity> {
    return {
      id: user.id,
      keyCloakId: user.keyCloakId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      picture: user.picture,
      gender: user.gender,
      birthday: user.birthday,
      phoneNumber: user.phoneNumber,
    };
  }
}
