import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const email_in_use = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (email_in_use) {
      throw new HttpException(
        'El e-mail ya se encuentra en uso por otro usuario',
        HttpStatus.CONFLICT,
      );
    }
    await this.userRepository.save(createUserDto);
    return {
      status: true,
      message: 'Usuario creado correctamente',
    };
  }

  async findAll() {
    const users = await this.userRepository.find();
    if (users.length === 0) {
      throw new HttpException(
        'No existen usuarios en la base de datos',
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      status: true,
      users,
    };
  }

  async findOne(id: number) {
    const user_to_found = await this.userRepository.findOne({
      where: {
        id_user: id,
        status: true,
      },
    });
    if (!user_to_found) {
      throw new HttpException(
        'No fue encontrado el usuario en la base de datos',
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      status: true,
      user: user_to_found,
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const email_in_use = await this.userRepository.findOne({
      where: {
        email: updateUserDto.email,
      },
    });
    if (email_in_use && email_in_use.id_user !== id) {
      throw new HttpException(
        'El e-mail ya se encuentra en uso',
        HttpStatus.CONFLICT,
      );
    }
    const user_to_update = await this.findOne(id);
    Object.assign(user_to_update.user, updateUserDto);
    await this.userRepository.save(user_to_update.user);
    return {
      status: true,
      message: 'Usuario actualizado correctamente',
    };
  }

  async remove(id: number) {
    const user_to_delete = await this.findOne(id);
    user_to_delete.user.status = false;
    await this.userRepository.save(user_to_delete.user);
    return {
      status: true,
      message: 'Usuario eliminado correctamente',
    };
  }
}
