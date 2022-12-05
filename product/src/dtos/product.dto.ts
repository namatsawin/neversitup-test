import { IsOptional } from 'class-validator';

export class GetProductListEvent {
  @IsOptional()
  page = 1;

  @IsOptional()
  size = 10;
}
