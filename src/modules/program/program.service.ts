import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Program } from './entities/program.entity';
import { Repository } from 'typeorm';
import { ListProgramsDto } from './dto/list-programs.dto';

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(Program)
    protected readonly programRepository: Repository<Program>,
  ) {}

  async create(createProgramDto: CreateProgramDto) {
    const name_in_use = await this.programRepository.findOne({
      where: {
        name_program: createProgramDto.name_program,
      },
    });
    if (name_in_use) {
      throw new HttpException(
        'El nombre del programa se encuentra en uso',
        HttpStatus.CONFLICT,
      );
    }
    await this.programRepository.save(createProgramDto);
    return {
      status: true,
      message: 'Programa creado correctamente',
    };
  }

  async findAll(listProgramsDto: ListProgramsDto) {
    const list_programs = await this.programRepository.find({
      where: {
        status: listProgramsDto.status,
      },
    });
    if (list_programs.length === 0) {
      throw new HttpException(
        'No se encontraron programas en la base de datos',
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      status: true,
      programs: list_programs,
      total: list_programs.length,
    };
  }

  async findOne(id: number) {
    const program_to_show = await this.programRepository.findOne({
      where: {
        id_program: id,
        status: true,
      },
    });
    if (!program_to_show) {
      throw new HttpException(
        'El program no esta registrado en la base de datos o esta deshabilitado',
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      status: true,
      program: program_to_show,
    };
  }

  async update(id: number, updateProgramDto: UpdateProgramDto) {
    const name_in_use = await this.name_in_use(
      updateProgramDto.name_program,
      id,
    );
    if (name_in_use) {
      throw new HttpException(
        'El nombre ya se encuentra en uso por otro programa',
        HttpStatus.CONFLICT,
      );
    }
    const program_to_update = await this.programRepository.findOne({
      where: {
        id_program: id,
      },
    });
    if (!program_to_update) {
      throw new HttpException(
        'El programa no se encuentra registrado',
        HttpStatus.NOT_FOUND,
      );
    }
    Object.assign(program_to_update, updateProgramDto);
    await this.programRepository.save(program_to_update);
    return {
      status: true,
      message: 'Programa actualizado correctamente',
    };
  }

  async remove(id: number) {
    const program_to_delete = await this.findOne(id);
    program_to_delete.program.status = false;
    await this.programRepository.save(program_to_delete.program);
    return {
      status: true,
      message: 'Programa eliminado correctamente',
    };
  }

  async name_in_use(name_program: string, id_program: number) {
    const name_in_use = await this.programRepository.findOne({
      where: {
        name_program: name_program,
      },
    });
    if (name_in_use && name_in_use.id_program !== id_program) {
      return true;
    }
    return false;
  }
}
