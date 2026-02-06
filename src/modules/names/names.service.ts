import {
  HttpException,
  HttpStatus,
  Injectable,
  LOG_LEVELS,
} from '@nestjs/common';
import { CreateNameDto } from './dto/create-name.dto';
import { UpdateNameDto } from './dto/update-name.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Name } from './entities/name.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NamesService {
  constructor(
    @InjectRepository(Name) private readonly nameRepository: Repository<Name>,
  ) {}

  async create(createNameDto: CreateNameDto) {
    await this.nameRepository.save(createNameDto);
    return {
      status: true,
      message: 'Nombre creado correctamente',
    };
  }

  async findAll() {
    const names = await this.nameRepository.find();
    if (names.length === 0) {
      throw new HttpException(
        'No existen nombre registrado en la base de datos',
        HttpStatus.NOT_FOUND,
      );
    }
    return names;
  }

  async findOne(id: number) {
    const name_to_show = await this.nameRepository.findOne({
      where: { id_name: id },
    });
    if (!name_to_show) {
      throw new HttpException(
        'El id del nombre se encuentra registrado en la base de datos',
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      status: true,
      name: name_to_show,
    };
  }

  async update(id: number, updateNameDto: UpdateNameDto) {
    const name_to_update = await this.findOne(id);
    Object.assign(name_to_update.name, updateNameDto);
    await this.nameRepository.save(name_to_update.name);
    return {
      status: true,
      message: 'Actualizado correctamente',
    };
  }

  async remove(id: number) {
    const name_to_delte = await this.nameRepository.findOne({
      where: { id_name: id },
    });
    if (!name_to_delte) {
      throw new HttpException(
        'El nombre no se encuentra registrado en la base de datos',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.nameRepository.delete(id);
    return {
      status: true,
      message: 'El nombre fue eliminado correctamente',
    };
  }
}
