import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { User } from './domain/user';
import { UserUpdate } from './domain/user-update.domain';
import { UserCreate } from './domain/user-create.domain';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(userCreate: UserCreate): Promise<User> {
    await this.verifyEmailIsNotExisting(userCreate.email);
    const userEntity = await this.userRepository.save(
      this.userRepository.create(UserCreate.toEntity(userCreate)),
    );

    return User.fromEntity(userEntity);
  }

  async findAll(): Promise<User[]> {
    return User.fromEntities(await this.userRepository.find());
  }

  async findById(id: number): Promise<User> {
    return User.fromEntity(await this.findUserOrThrow(id));
  }

  async update(id: number, userUpdate: UserUpdate): Promise<User> {
    const userEntity = await this.findUserOrThrow(id);

    return User.fromEntity(
      await this.userRepository.save({
        ...userEntity,
        ...UserUpdate.toEntity(userUpdate),
      }),
    );
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.remove(await this.findUserOrThrow(id));
  }

  private async verifyEmailIsNotExisting(email: string): Promise<void> {
    if (await this.userRepository.existsBy({ email })) {
      throw new BadRequestException('Email already exists');
    }
  }

  private async findUserOrThrow(id: number): Promise<UserEntity> {
    const userEntity = await this.userRepository.findOneBy({ id });

    if (!userEntity) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return userEntity;
  }
}
