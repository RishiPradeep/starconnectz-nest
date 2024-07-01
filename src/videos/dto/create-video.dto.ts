import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { isNullOrUndefined } from 'util';
export class CreateVideoDto {
  @IsString()
  @IsNotEmpty()
  celeb_username: string;
  @IsNotEmpty()
  @IsString()
  fan_username: string;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNumber()
  @IsNotEmpty()
  orderid: number;
}
