import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { AuthServiceService } from '../../services/auth-service/auth-service.service';
import { Rol } from '../rols/entities/rol.entity';
import { AddRolesDto } from './dto/add-roles.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Rol) private readonly rolRepository: Repository<Rol>,
    protected readonly authService: AuthServiceService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const password_hash = await this.authService.hash_password(
      createUserDto.password,
    );
    const rol_assing = await this.get_rols([createUserDto.id_rol]);
    const user_to_create = this.userRepository.create({
      name_user: createUserDto.name_user,
      lastname: createUserDto.lastname,
      email: createUserDto.email,
      password: password_hash,
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

  findAll() {
    return `This action returns all user`;
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
    const rols_to_add = await this.get_rols(addRolesDto.id_roles);
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

  async get_rols(ids: number[]) {
    const rols_to_return: Rol[] = [];
    for (const rol of ids) {
      const rol_to_found = await this.rolRepository.findOne({
        where: {
          id_rol: rol,
        },
      });
      if (rol_to_found) {
        rols_to_return.push(rol_to_found);
      }
    }
    return rols_to_return;
  }
}
