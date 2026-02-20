import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IdValidationPipe } from '../../utils/pipes/id-validation/id-validation.pipe';
import { AddRolesDto } from './dto/add-roles.dto';
import { ListUsersDto } from './dto/list-users.dto';

@Controller('/api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/save')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/list')
  findAll(@Body() listUsersDto: ListUsersDto) {
    return this.userService.findAll(listUsersDto);
  }

  @Get('/find/:id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Put('/add_roles/:id')
  assign_rols(
    @Param('id', IdValidationPipe) id: string,
    @Body() addRolesDto: AddRolesDto,
  ) {
    return this.userService.add_roles(+id, addRolesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
