import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { AuthServiceService } from '../../services/auth-service/auth-service.service';
import { ListClientsDto } from './dto/list-clients.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private readonly authService: AuthServiceService,
  ) {}

  async create(createClientDto: CreateClientDto) {
    const password_hash = await this.authService.hash_password(
      createClientDto.password,
    );
    const cliente_to_save = this.clientRepository.create({
      ...createClientDto,
      address: {
        ...createClientDto.address,
        zip_code: Number(createClientDto.address.zip_code),
      },
      password: password_hash,
    });

    const result_validated_email_in_use = await this.validated_email_in_use(
      createClientDto.email,
    );
    if (result_validated_email_in_use) {
      throw new HttpException(
        'El email ya se encuentra en uso por otro usuario',
        HttpStatus.CONFLICT,
      );
    }
    await this.clientRepository.save(cliente_to_save);
    return {
      status: true,
      message: 'Cliente creado correctamente',
    };
  }

  async findAll(listClientsDto: ListClientsDto) {
    const clients = await this.clientRepository.find({
      relations: ['address'],
      where: {
        status: listClientsDto.status,
      },
    });
    if (clients.length === 0) {
      throw new HttpException(
        'No existen clientes registrados',
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      status: true,
      clients,
      total: clients.length,
    };
  }

  async findOne(id: number) {
    const client_to_show = await this.clientRepository.findOne({
      where: {
        id_client: id,
        status: true,
      },
      relations: ['address'],
    });
    if (!client_to_show) {
      throw new HttpException(
        'El cliente no se encuentra o fue deshabilitado',
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      status: true,
      client: client_to_show,
    };
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const result_validation = await this.validated_email_in_use_with_id(
      updateClientDto.email,
      id,
    );
    if (result_validation) {
      throw new HttpException(
        'El email ya se encuentra en uso por otro usuario',
        HttpStatus.CONFLICT,
      );
    }
    const user_to_update = await this.clientRepository.findOne({
      where: {
        id_client: id,
      },
      relations: ['address'],
    });
    if (!user_to_update) {
      throw new HttpException(
        'El cliente no esta registrado o se encuentra deshabilitado',
        HttpStatus.NOT_FOUND,
      );
    }
    const { address, ...clientData } = updateClientDto;
    Object.assign(user_to_update, clientData);
    user_to_update.password = await this.authService.hash_password(
      updateClientDto.password,
    );
    if (address) {
      Object.assign(user_to_update.address, address);
    }
    await this.clientRepository.save(user_to_update);
    return {
      status: true,
      message: 'Cliente actualizado correctamente',
    };
  }

  async remove(id: number) {
    const client_to_delete = await this.findOne(id);
    client_to_delete.client.status = false;
    await this.clientRepository.save(client_to_delete.client);
    return {
      status: true,
      message: 'Cliente eliminado correctamente',
    };
  }

  async validated_email_in_use(email: string) {
    const email_in_use = await this.clientRepository.findOne({
      where: {
        email,
      },
    });
    if (email_in_use) {
      return true;
    }
    return false;
  }

  async validated_email_in_use_with_id(email: string, id: number) {
    const email_in_use = await this.clientRepository.findOne({
      where: {
        email,
      },
    });
    if (email_in_use && email_in_use.id_client !== id) {
      return true;
    }
    return false;
  }
}
