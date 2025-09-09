import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { UserCreateDto } from './dto/user-create.dto'
import { UserUpdateDto } from './dto/user-update.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from './entities/user.entity'
import { User } from './domain/user'
import { UserDto } from './dto/user.dto'
import { UserUpdateDomain } from './domain/user-update.domain'

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

  async create(createUserDto: UserCreateDto): Promise<UserDto> {
    const emailExists = await this.isEmailExisting(createUserDto.email)
    if (emailExists) {
      throw new BadRequestException('Email already exists')
    }
    const userDomain = UserCreateDto.toDomain(createUserDto)
    const newUser = userDomain.toEntity()
    const savedUser = await this.userRepository.save(newUser)
    const user = User.toDomain(savedUser)
    return UserDto.fromDomain(user)
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.userRepository.find()
    if (users.length === 0) {
      return []
    }
    return users.map((user) => {
      const userDomain = User.toDomain(user)
      return UserDto.fromDomain(userDomain)
    })
  }

  async findById(id: number): Promise<UserDto> {
    const user = await this.userRepository.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`)
    }
    const userDomain = User.toDomain(user)
    return UserDto.fromDomain(userDomain)
  }

  async update(id: number, updateUserDto: UserUpdateDto): Promise<UserDto> {
    const user = await this.userRepository.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`)
    }
    const updateDomain = UserUpdateDto.toDomain(updateUserDto, id)
    const updatedUserEntity = updateDomain.toEntity(user, updateUserDto)
    const savedUser = await this.userRepository.save(updatedUserEntity)
    const updatedUserDomain = User.toDomain(savedUser)

    return UserDto.fromDomain(updatedUserDomain)
  }

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`)
    }
    await this.userRepository.remove(user)
  }
}
