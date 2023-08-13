import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async getAll(): Promise<Order[]> {
    return this.orderModel.find();
  }

  async getById(id: string): Promise<Order> {
    return this.orderModel.findById(id);
  }

  async create(order: CreateOrderDto): Promise<Order> {
    return await this.orderModel.create(order);
  }

  async update(id: string, order: UpdateOrderDto) {
    return this.orderModel.updateOne({ _id: id }, order);
  }

  async delete(id: string) {
    return this.orderModel.deleteOne({ _id: id });
  }
}
