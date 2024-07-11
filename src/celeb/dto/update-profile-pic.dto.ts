import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdateProfilePicDto {
  @IsString()
  @IsNotEmpty()
  username: string;
}
