import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMerchDto {
  @IsString()
  @IsNotEmpty()
  celeb_username: string;
  @IsString()
  description: string;
  @IsString()
  @IsNotEmpty()
  price: string;
  @IsString()
  @IsNotEmpty()
  status: string;
}
