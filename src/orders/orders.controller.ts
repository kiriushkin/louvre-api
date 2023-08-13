import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { Order } from './order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOkResponse({ type: [Order] })
  async getAll(): Promise<Order[]> {
    return await this.ordersService.getAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: Order })
  async getById(@Param('id') id: string): Promise<Order> {
    return this.ordersService.getById(id);
  }

  @Post()
  @ApiCreatedResponse({ type: Order })
  async create(@Body() order: CreateOrderDto): Promise<Order> {
    return await this.ordersService.create(order);
  }

  @Patch(':id')
  @ApiOkResponse()
  async update(@Param('id') id: string, @Body() order: UpdateOrderDto) {
    return await this.ordersService.update(id, order);
  }

  @Delete(':id')
  @ApiOkResponse()
  async delete(@Param('id') id: string) {
    return await this.ordersService.delete(id);
  }
}
