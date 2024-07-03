import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
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
  @IsString()
  @IsNotEmpty()
  orderid: string;
}
