import { Schema, model } from 'mongoose';

export interface IOrder {
  type: 'Permanent exhibition' | 'Temporary exhibition' | 'Combined Admission';
  amount: {
    basic: number;
    senior: number;
  };
  date: Date;
  name: string;
  email: string;
  phone: string;
}

const orderSchema = new Schema<IOrder>(
  {
    type: { type: String, required: true },
    amount: { type: Object, required: true },
    date: { type: Date, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { timestamps: true },
);

export const Order = model<IOrder>('Order', orderSchema);
