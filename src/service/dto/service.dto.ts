import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';

enum categories {
  PERSONAL = 'personal',
  BUSINESS = 'business',
}

export class ServiceDto {
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  time_needed: number;

  @IsEnum(categories)
  @IsNotEmpty()
  category: categories;
}
