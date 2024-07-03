import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateProfilePicDto {
  @IsString()
  @IsNotEmpty()
  username: string;
}
