import { UserEntity } from '../entities/user.entity';

export class User {
  readonly id: number;

  readonly name: string;

  readonly email: string;

  readonly createdAt: Date;

  readonly updatedAt: Date;

  static fromEntity(entity: UserEntity): User {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static fromEntities(entities: UserEntity[]): User[] {
    return entities.map((entity) => this.fromEntity(entity));
  }
}
