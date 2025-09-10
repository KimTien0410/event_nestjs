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
    return UserDto.fromDomain(
      await this.userService.create(
        UserCreateDto.toUserCreate(createUserDto)
      )
    );
  }

  @Get()
  async findAll(): Promise<UserDto[]> {
    return UserDto.fromDomains(
      await this.userService.findAll()
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return UserDto.fromDomain(
      await this.userService.findById(id)
    );
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UserUpdateDto,
  ): Promise<UserDto> {
    return UserDto.fromDomain(
      await this.userService.update(id, UserUpdateDto.toUserUpdate(updateUserDto))
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.userService.remove(id);
  }
}
