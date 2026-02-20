import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RolsService } from './rols.service';
import type { Request as ExpressRequest } from 'express';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { ListRolsDto } from './dto/list-rols.dto';
import { IdValidationPipe } from '../../utils/pipes/id-validation/id-validation.pipe';
import { JwtAuthGuard } from '../auth/JwtAuthGuard';

@Controller('/api/v1/rols')
@UseGuards(JwtAuthGuard)
export class RolsController {
  constructor(private readonly rolsService: RolsService) {}

  @Post('/save')
  create(@Body() createRolDto: CreateRolDto) {
    return this.rolsService.create(createRolDto);
  }

  @Get('/list')
  findAll(@Body() listRolsDto: ListRolsDto, @Request() req: any) {
    return this.rolsService.findAll(listRolsDto, req);
  }

  @Get('/find/:id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.rolsService.findOne(+id);
  }

  @Put('/update/:id')
  update(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateRolDto: UpdateRolDto,
  ) {
    return this.rolsService.update(+id, updateRolDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.rolsService.remove(+id);
  }

  @Delete('/destroy/:id')
  destroy(@Param('id', IdValidationPipe) id: string) {
    return this.rolsService.destroy(+id);
  }
}
