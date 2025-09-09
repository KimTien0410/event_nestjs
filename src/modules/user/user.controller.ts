import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserDto } from './dto/user.dto'
import { UserMapper } from './dto/user.mapper'
import { BaseController } from '../../common/base/base.controller'
import { ResponseCode } from '../../common/enums/response-code.enum'
import { ResponseMessage } from '../../common/enums/response-message.enum'

@Controller('users')
export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super()
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const userDomain = await this.userService.create(createUserDto)
    const userDto: UserDto = UserMapper.toDto(userDomain)
    return this.created(userDto, ResponseMessage.CREATED)
  }

  @Get()
  async findAll() {
    const usersDomain = await this.userService.findAll()
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const usersDto: UserDto[] = usersDomain.map(UserMapper.toDto)
    return this.ok(usersDto, ResponseMessage.SUCCESS)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const userDomain = await this.userService.findById(+id)
    if (!userDomain) {
      return this.error(ResponseMessage.NOT_FOUND, ResponseCode.NOT_FOUND)
    }

    const userDto: UserDto = UserMapper.toDto(userDomain)
    return this.ok(userDto, ResponseMessage.SUCCESS)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedDomain = await this.userService.update(+id, updateUserDto)
    if (!updatedDomain) {
      return this.error(ResponseMessage.NOT_FOUND, ResponseCode.NOT_FOUND)
    }

    const updatedDto: UserDto = UserMapper.toDto(updatedDomain)
    return this.ok(updatedDto, ResponseMessage.UPDATED)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.userService.remove(+id)
    if (!deleted) {
      return this.error(ResponseMessage.NOT_FOUND, ResponseCode.NOT_FOUND)
    }

    return this.deleted(ResponseMessage.DELETED)
  }
}
