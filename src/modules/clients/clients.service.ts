import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { AuthServiceService } from '../../services/auth-service/auth-service.service';

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

  findAll() {
    return `This action returns all clients`;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
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
}
