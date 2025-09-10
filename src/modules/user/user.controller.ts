import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common'
import { UserService } from './user.service'
import { UserCreateDto } from './dto/user-create.dto'
import { UserUpdateDto } from './dto/user-update.dto'
import { UserDto } from './dto/user.dto'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: UserCreateDto): Promise<UserDto> {
    const userCreate = UserCreateDto.toDomain(createUserDto)
    const user = await this.userService.create(userCreate)
    return UserDto.fromDomain(user)
  }

  @Get()
  async findAll(): Promise<UserDto[]> {
    const users = await this.userService.findAll()
    return UserDto.fromDomains(users)
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    const user = await this.userService.findById(id)
    return UserDto.fromDomain(user)
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UserUpdateDto,
  ): Promise<UserDto> {
    const userUpdate = UserUpdateDto.toDomain(updateUserDto)
    const user = await this.userService.update(id, userUpdate)
    return UserDto.fromDomain(user)
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.userService.remove(id)
  }
}
