import { IsNumber, IsNotEmpty } from 'class-validator';
export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  celebid: number;
  @IsNumber()
  @IsNotEmpty()
  fanid: number;
  @IsNumber()
  @IsNotEmpty()
  serviceid: number;
}
