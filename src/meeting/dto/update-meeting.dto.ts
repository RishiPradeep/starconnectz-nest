import { IsEnum, IsNotEmpty } from 'class-validator';

enum categories {
  PENDING = 'pending',
  COMPLETED = 'completed',
}

export class UpdateMeetingDto {
  @IsEnum(categories)
  @IsNotEmpty()
  status: categories;
}
