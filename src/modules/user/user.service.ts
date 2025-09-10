import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from './entities/user.entity'
import { User } from './domain/user'
import { UserUpdate } from './domain/user-update.domain'
import { UserCreate } from './domain/user-create.domain'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  private async isEmailExisting(email: string): Promise<boolean> {

    return  await this.userRepository.existsBy({ email });
  }

  private async checkUserExists(id: number): Promise<UserEntity> {
    const userEntity = await this.userRepository.findOneBy({ id });

    if (!userEntity) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return userEntity;
  }

  async create(userCreate: UserCreate): Promise<User> {
    const emailExists = await this.isEmailExisting(userCreate.email);

    if (emailExists) {
      throw new BadRequestException('Email already exists');
    }

    const userEntity = await this.userRepository.save(
      UserCreate.toEntity(userCreate)
    );

    return User.fromEntity(userEntity);
  }

  async findAll(): Promise<User[]> {
    return User.fromEntities(
      await this.userRepository.find()
    );
  }

  async findById(id: number): Promise<User> {

    return User.fromEntity(
      await this.checkUserExists(id)
    );
  }

  async update(id: number, userUpdate: UserUpdate): Promise<User> {
    const userEntity = await this.checkUserExists(id);

    return User.fromEntity(
      await this.userRepository.save(
        UserUpdate.toEntity(userUpdate)
      )
    );
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.remove(await this.checkUserExists(id));
  }
}
