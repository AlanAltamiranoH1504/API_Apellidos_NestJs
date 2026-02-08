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
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ListClientsDto } from './dto/list-clients.dto';
import { IdValidationPipe } from '../../utils/pipes/id-validation/id-validation.pipe';

@Controller('/api/v1/clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post('/save')
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get('/list')
  findAll(@Body() listClientsDto: ListClientsDto) {
    return this.clientsService.findAll(listClientsDto);
  }

  @Get('/find/:id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.clientsService.findOne(+id);
  }

  @Put('/update/:id')
  update(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientsService.update(+id, updateClientDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.clientsService.remove(+id);
  }
}
