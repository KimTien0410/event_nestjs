import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserDto } from './dto/user.dto';
import type { Uuid } from '../../common/types';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: UserCreateDto): Promise<UserDto> {
    return UserDto.fromDomain(
      await this.userService.create(UserCreateDto.toUserCreate(createUserDto)),
    );
  }

  @Get()
  async findAll(): Promise<UserDto[]> {
    return UserDto.fromDomains(await this.userService.findAll());
  }

  @Get(':id')
  async findOne(@Param('id') id: Uuid): Promise<UserDto> {
    return UserDto.fromDomain(await this.userService.findById(id));
  }

  @Patch(':id')
  async update(
    @Param('id') id: Uuid,
    @Body() updateUserDto: UserUpdateDto,
  ): Promise<UserDto> {
    return UserDto.fromDomain(
      await this.userService.update(
        id,
        UserUpdateDto.toUserUpdate(updateUserDto),
      ),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: Uuid): Promise<void> {
    await this.userService.remove(id);
  }
}
