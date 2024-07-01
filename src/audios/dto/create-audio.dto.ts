import { IsNotEmpty, IsString } from 'class-validator';
export class CreateAudioDto {
  @IsString()
  @IsNotEmpty()
  celeb_username: string;
  @IsNotEmpty()
  @IsString()
  fan_username: string;
  @IsNotEmpty()
  @IsString()
  description: string;
}
