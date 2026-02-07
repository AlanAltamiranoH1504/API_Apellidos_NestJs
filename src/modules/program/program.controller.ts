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
import { ProgramService } from './program.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { ListProgramsDto } from './dto/list-programs.dto';
import { IdValidationPipe } from '../../utils/pipes/id-validation/id-validation.pipe';

@Controller('/api/v1/program')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Post('/save')
  create(@Body() createProgramDto: CreateProgramDto) {
    return this.programService.create(createProgramDto);
  }

  @Get('/list')
  findAll(@Body() listProgramsDto: ListProgramsDto) {
    return this.programService.findAll(listProgramsDto);
  }

  @Get('/find/:id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.programService.findOne(+id);
  }

  @Put('/update/:id')
  update(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateProgramDto: UpdateProgramDto,
  ) {
    return this.programService.update(+id, updateProgramDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.programService.remove(+id);
  }
}
