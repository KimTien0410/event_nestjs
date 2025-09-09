import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from './entities/user.entity'
import { User } from './domain/user'
import { UserMapper } from './dto/user.mapper'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create({
      ...createUserDto,
      role: 'user',
    })

    const savedUser = await this.userRepository.save(newUser)
    return UserMapper.toDomain(savedUser)
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find()
    return users.map((user) => UserMapper.toDomain(user))
  }

  async findById(id: number): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id } })
    return user ? UserMapper.toDomain(user) : null
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id } })
    if (!user) {
      return null
    }

    Object.assign(user, updateUserDto)
    const updatedUser = await this.userRepository.save(user)
    return UserMapper.toDomain(updatedUser)
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.userRepository.delete(id)
    // Sử dụng toán tử ?? để fallback null/undefined về 0
    return (result.affected ?? 0) > 0
  }
}
