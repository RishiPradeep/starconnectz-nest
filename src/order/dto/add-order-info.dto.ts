import { IsNotEmpty, IsString } from 'class-validator';

export class AddOrderDetailsDto {
  @IsString()
  @IsNotEmpty()
  occasion: string;
  @IsString()
  @IsNotEmpty()
  wishes_to: string;
  @IsString()
  @IsNotEmpty()
  additional_info: string;
}
