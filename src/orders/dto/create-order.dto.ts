import {
  IsString,
  IsNumber,
  IsEmail,
  IsEnum,
  IsObject,
  IsPhoneNumber,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export enum OrderType {
  'Permanent Exhibition' = 'Permanent exhibition',
  'Temporary exhibition' = 'Temporary exhibition',
  'Combined Admission' = 'Combined Admission',
}

export class Amount {
  @IsNumber()
  @ApiProperty()
  basic: number;
  @IsNumber()
  @ApiProperty()
  senior: number;
}

export class CreateOrderDto {
  @IsEnum(OrderType, {
    message: `type must be one of the following values: ${OrderType[0]}, ${OrderType[1]}, ${OrderType[2]}`,
  })
  @ApiProperty({ enum: OrderType })
  readonly type: OrderType;

  @IsObject()
  @ValidateNested()
  @Type(() => Amount)
  @ApiProperty()
  readonly amount: Amount;

  @IsDateString()
  @ApiProperty()
  readonly date: Date;

  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsPhoneNumber()
  @ApiProperty()
  readonly phone: string;
}
