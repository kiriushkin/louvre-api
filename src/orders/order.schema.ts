import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { Amount, OrderType } from './dto/create-order.dto';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  @ApiProperty({ enum: OrderType })
  type: 'Permanent exhibition' | 'Temporary exhibition' | 'Combined Admission';

  @Prop({ required: true, type: { basic: Number, senior: Number } })
  @ApiProperty({ type: Amount })
  amount: {
    basic: number;
    senior: number;
  };

  @Prop({ required: true })
  @ApiProperty()
  date: Date;

  @Prop({ required: true })
  @ApiProperty()
  name: string;

  @Prop({ required: true })
  @ApiProperty()
  email: string;

  @Prop({ required: true })
  @ApiProperty()
  phone: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
