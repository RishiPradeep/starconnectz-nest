import { IsEnum, IsNotEmpty } from 'class-validator';

enum categories {
  PENDING = 'pending',
  INPROGRESS = 'rejected',
  COMPLETED = 'completed',
}

export class UpdateOrderStatusDto {
  @IsEnum(categories)
  @IsNotEmpty()
  status: categories;
}
