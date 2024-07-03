import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  celeb_username: string;
  @IsString()
  caption: string;
}
