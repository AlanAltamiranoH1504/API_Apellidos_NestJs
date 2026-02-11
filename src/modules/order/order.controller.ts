import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ListOrderDto } from './dto/list-order.dto';
import { IdValidationPipe } from '../../utils/pipes/id-validation/id-validation.pipe';

@Controller('/api/v1/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/save')
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get('/list')
  findAll(@Body() listOrderDto: ListOrderDto) {
    return this.orderService.findAll(listOrderDto);
  }

  @Get('/find/:id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.orderService.remove(+id);
  }

  @Delete(":id")
  delete(@Param("id", IdValidationPipe) id: string) {
    return this.orderService.delete(+id);
  }
}
