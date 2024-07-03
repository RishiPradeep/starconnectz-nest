import { IsString, IsNotEmpty } from 'class-validator';

export class FollowCelebDto {
  @IsString()
  @IsNotEmpty()
  fan_username: string;
  @IsString()
  @IsNotEmpty()
  celeb_username: string;
}
