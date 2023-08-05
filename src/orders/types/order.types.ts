import { IsNumber } from 'class-validator';

export enum OrderType {
  'Permanent exhibition',
  'Temporary exhibition',
  'Combined Admission',
}

export class Amount {
  @IsNumber()
  basic: number;
  @IsNumber()
  senior: number;
}
