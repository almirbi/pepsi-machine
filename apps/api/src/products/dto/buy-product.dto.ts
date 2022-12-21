import { IsInt, Min } from 'class-validator';

export class BuyProductDto {
  public productId: string;

  @IsInt()
  @Min(1)
  // TODO decorator for max
  public amount: number;
}
