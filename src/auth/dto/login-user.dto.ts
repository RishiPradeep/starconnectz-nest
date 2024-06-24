import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

enum categories {
  CELEB = 'celeb',
  FAN = 'fan',
}

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsEnum(categories)
  @IsNotEmpty()
  type: categories;
}
