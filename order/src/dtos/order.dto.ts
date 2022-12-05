import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  userId: number;

  @IsArray()
  @ArrayMinSize(1)
  @Type(() => OrderItemDto)
  @ValidateNested({ each: true })
  items: OrderItemDto[];
}

export class OrderItemDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  quantity: number;
}

export class GetOrderInfoDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  orderId: number;
}

export class CancelOrderDto extends GetOrderInfoDto {}
