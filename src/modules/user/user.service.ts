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

  async isEmailExisting(email: string): Promise<boolean> {
    const count = await this.userRepository.count({ where: { email } })
    return count > 0
  }

  async create(userCreate: UserCreate): Promise<User> {
    const emailExists = await this.isEmailExisting(userCreate.email)
    if (emailExists) {
      throw new BadRequestException('Email already exists')
    }
    const userEntity = await this.userRepository.save(userCreate.toEntity())
    return User.fromEntity(userEntity)
  }

  async findAll(): Promise<User[]> {
    const userEntitys = await this.userRepository.find()
    if (userEntitys.length === 0) {
      return []
    }
    return userEntitys.map((user) => User.fromEntity(user))
  }

  async findById(id: number): Promise<User> {
    const userEntity = await this.userRepository.findOne({ where: { id } })
    if (!userEntity) {
      throw new NotFoundException(`User with id ${id} not found`)
    }
    return User.fromEntity(userEntity)
  }

  async update(id: number, userUpdate: UserUpdate): Promise<User> {
    const userEntity = await this.userRepository.findOne({ where: { id } })
    if (!userEntity) {
      throw new NotFoundException(`User with id ${id} not found`)
    }
    const userEntityUpdate = userUpdate.toEntity(userEntity, userUpdate)
    await this.userRepository.save(userEntityUpdate)
    return User.fromEntity(userEntity)
  }

  async remove(id: number): Promise<void> {
    const userEntity = await this.userRepository.findOne({ where: { id } })
    if (!userEntity) {
      throw new NotFoundException(`User with id ${id} not found`)
    }
    await this.userRepository.remove(userEntity)
  }
}
