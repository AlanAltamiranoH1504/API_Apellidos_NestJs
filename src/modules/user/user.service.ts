import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Rol } from '../rols/entities/rol.entity';
import { AddRolesDto } from './dto/add-roles.dto';
import { ListUsersDto } from './dto/list-users.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Rol) private readonly rolRepository: Repository<Rol>,
    // protected readonly authService: AuthServiceService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // const password_hash = await this.authService.hash_password(
    //   createUserDto.password,
    // );
    const rol_assing = await this.get_rols(
      [createUserDto.id_rol],
      createUserDto.id_program,
    );
    const user_to_create = this.userRepository.create({
      name_user: createUserDto.name_user,
      lastname: createUserDto.lastname,
      email: createUserDto.email,
      password: createUserDto.password,
      program: {
        id_program: createUserDto.id_program,
      },
      rols: rol_assing,
    });
    await this.userRepository.save(user_to_create);
    return {
      status: true,
      message: 'Usuario creado correctamente',
    };
  }

  async findAll(listUsersDto: ListUsersDto) {
    const users_list = await this.userRepository.find({
      where: {
        program: {
          id_program: listUsersDto.id_program,
        },
        status: listUsersDto.status,
      },
      relations: ['rols'],
    });
    if (users_list.length === 0) {
      throw new HttpException(
        'No existen usuarios registrados',
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      status: true,
      users: users_list,
      total: users_list.length,
    };
  }

  async findOne(id: number) {
    const user_to_show = await this.userRepository.findOne({
      where: {
        id_user: id,
        status: true,
      },
      relations: ['program', 'rols'],
    });
    if (!user_to_show) {
      throw new HttpException(
        'El usuario no se encuentra registrado en la db',
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      status: true,
      user: user_to_show,
    };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async add_roles(id: number, addRolesDto: AddRolesDto) {
    const user_to_update = await this.findOne(id);
    const rols_to_add = await this.get_rols(
      addRolesDto.id_roles,
      user_to_update.user.program.id_program,
    );
    const rol_user = user_to_update.user.rols;

    for (const rol of rols_to_add) {
      if (!rol_user.includes(rol)) {
        rol_user.push(rol);
      }
    }
    user_to_update.user.rols = rol_user;
    await this.userRepository.save(user_to_update.user);

    return {
      status: true,
      message: 'Roles agregados correctamente al usuario',
    };
  }

  async get_rols(ids: number[], id_program: number) {
    const rols_to_return: Rol[] = [];
    for (const rol of ids) {
      const rol_to_found = await this.rolRepository.findOne({
        where: {
          id_rol: rol,
          program: {
            id_program: id_program,
          },
        },
      });
      if (rol_to_found) {
        rols_to_return.push(rol_to_found);
      }
    }
    return rols_to_return;
  }
}
