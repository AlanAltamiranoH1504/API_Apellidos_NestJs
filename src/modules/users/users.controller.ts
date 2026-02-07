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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IdValidationPipe } from '../../utils/pipes/id-validation/id-validation.pipe';

@Controller('/api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('/list')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/find/:id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.usersService.findOne(+id);
  }

  @Put('/update/:id')
  update(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.usersService.remove(+id);
  }
}
