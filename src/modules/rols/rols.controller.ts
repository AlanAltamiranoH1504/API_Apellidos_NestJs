import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RolsService } from './rols.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { ListRolsDto } from './dto/list-rols.dto';
import { IdValidationPipe } from '../../utils/pipes/id-validation/id-validation.pipe';

@Controller('/api/v1/rols')
export class RolsController {
  constructor(private readonly rolsService: RolsService) {}

  @Post('/save')
  create(@Body() createRolDto: CreateRolDto) {
    return this.rolsService.create(createRolDto);
  }

  @Get('/list')
  findAll(@Body() listRolsDto: ListRolsDto) {
    return this.rolsService.findAll(listRolsDto);
  }

  @Get('/find/:id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.rolsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRolDto: UpdateRolDto) {
    return this.rolsService.update(+id, updateRolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolsService.remove(+id);
  }
}
