import {
  IsString,
  IsEmail,
  IsEnum,
  IsObject,
  IsPhoneNumber,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderType, Amount } from '../types/order.types';

export class CreateOrderDto {
  @IsEnum(OrderType, {
    message: `type must be one of the following values: ${OrderType[0]}, ${OrderType[1]}, ${OrderType[2]}`,
  })
  readonly type: OrderType;

  @IsObject()
  @ValidateNested()
  @Type(() => Amount)
  readonly amount: Amount;

  @IsDateString()
  readonly date: Date;

  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsPhoneNumber()
  readonly phone: string;
}
