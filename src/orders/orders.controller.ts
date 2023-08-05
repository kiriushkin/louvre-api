import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { IOrder } from '../models/Order';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async getAll(): Promise<IOrder[]> {
    return await this.ordersService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<IOrder> {
    return this.ordersService.getById(id);
  }

  @Post()
  async create(@Body() order: CreateOrderDto): Promise<IOrder> {
    return await this.ordersService.create(order);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() order: UpdateOrderDto) {
    return await this.ordersService.update(id, order);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.ordersService.delete(id);
  }
}
