import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { NamesService } from './names.service';
import { CreateNameDto } from './dto/create-name.dto';
import { UpdateNameDto } from './dto/update-name.dto';
import { IdValidationPipe } from '../../utils/pipes/id-validation/id-validation.pipe';

@Controller('api/v1/names')
export class NamesController {
  constructor(private readonly namesService: NamesService) {}

  @Post('/save')
  create(@Body() createNameDto: CreateNameDto) {
    return this.namesService.create(createNameDto);
  }

  @Get('/list')
  findAll() {
    return this.namesService.findAll();
  }

  @Get('/find/:id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.namesService.findOne(+id);
  }

  @Put('/update/:id')
  update(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateNameDto: UpdateNameDto,
  ) {
    return this.namesService.update(+id, updateNameDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.namesService.remove(+id);
  }
}
