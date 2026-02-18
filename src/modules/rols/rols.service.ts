import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';
import { Repository } from 'typeorm';
import { ListRolsDto } from './dto/list-rols.dto';

@Injectable()
export class RolsService {
  constructor(
    @InjectRepository(Rol) private readonly rolRepository: Repository<Rol>,
  ) {}

  async create(createRolDto: CreateRolDto) {
    const rol_to_save = this.rolRepository.create({
      name_rol: createRolDto.name_rol,
      program: {
        id_program: createRolDto.id_program,
      },
    });
    await this.rolRepository.save(rol_to_save);
    return {
      status: true,
      message: 'Rol creado correctamente',
    };
  }

  async findAll(listRolsDto: ListRolsDto) {
    const rols_by_program = await this.rolRepository.find({
      where: {
        status: listRolsDto.status,
        program: {
          id_program: listRolsDto.id_program,
        },
      },
    });
    if (rols_by_program.length === 0) {
      throw new HttpException(
        'No existen roles registrados para ese programa',
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      status: true,
      rols: rols_by_program,
      total: rols_by_program.length,
    };
  }

  async findOne(id: number) {
    const rol_to_show = await this.rolRepository.findOne({
      where: {
        id_rol: id,
        status: true,
      },
    });
    if (!rol_to_show) {
      throw new HttpException(
        'El rol no existe o se encuentra deshabilitado',
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      status: true,
      rol: rol_to_show,
    };
  }

  async update(id: number, updateRolDto: UpdateRolDto) {
    const name_in_use = await this.rolRepository.findOne({
      where: {
        name_rol: updateRolDto.name_rol,
        program: {
          id_program: updateRolDto.id_program,
        },
      },
    });

    if (name_in_use && name_in_use.id_rol !== id) {
      throw new HttpException(
        'El nombre del rol ya se encuentra en uso para el programa o no esta registrado',
        HttpStatus.CONFLICT,
      );
    }

    const rol_to_update = await this.rolRepository.findOne({
      where: {
        id_rol: id,
        program: {
          id_program: updateRolDto.id_program,
        },
      },
    });
    if (!rol_to_update) {
      throw new HttpException(
        'El rol no fue encontrado en la db',
        HttpStatus.NOT_FOUND,
      );
    }
    Object.assign(rol_to_update, updateRolDto);
    await this.rolRepository.save(rol_to_update);
    return {
      status: true,
      message: 'Rol actualizado correctamente',
    };
  }

  async remove(id: number) {
    const rol_to_remove = await this.findOne(id);
    rol_to_remove.rol.status = false;
    await this.rolRepository.save(rol_to_remove.rol);
    return {
      status: true,
      message: 'Rol eliminado correctamente',
    };
  }

  async destroy(id: number) {
    const rol_to_destroy = await this.rolRepository.findOne({
      where: {
        id_rol: id,
      },
    });
    if (!rol_to_destroy) {
      throw new HttpException(
        'El rol no se encuentra registrado en la base de datos',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.rolRepository.delete(rol_to_destroy.id_rol);
    return {
      status: true,
      message: 'Rol eliminado correctamente',
    };
  }
}
