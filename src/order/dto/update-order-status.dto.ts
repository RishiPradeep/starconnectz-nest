import { IsEnum, IsNotEmpty } from 'class-validator';

enum categories {
  PENDING = 'pending',
  INPROGRESS = 'inprogress',
  COMPLETED = 'completed',
}

export class UpdateOrderStatusDto {
  @IsEnum(categories)
  @IsNotEmpty()
  status: categories;
}
