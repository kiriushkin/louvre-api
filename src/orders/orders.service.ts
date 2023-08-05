import { Injectable } from '@nestjs/common';
import { Order, IOrder } from '../models/Order';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  async getAll(): Promise<IOrder[]> {
    return Order.find();
  }

  async getById(id: string): Promise<IOrder> {
    return Order.findById(id);
  }

  async create(order: CreateOrderDto): Promise<IOrder> {
    return await Order.create(order);
  }

  async update(id: string, order: UpdateOrderDto) {
    return Order.updateOne({ _id: id }, order);
  }

  async delete(id: string) {
    return Order.deleteOne({ _id: id });
  }
}
