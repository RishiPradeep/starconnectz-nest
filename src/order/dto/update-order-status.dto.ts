import { IsEnum, IsNotEmpty } from 'class-validator';

enum categories {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  COMPLETED = 'completed',
  REJECTED = 'rejected',
  INPROGRESS = 'inprogress',
}

export class UpdateOrderStatusDto {
  @IsEnum(categories)
  @IsNotEmpty()
  status: categories;
}
