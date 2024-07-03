import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMeetingDto {
  @IsString()
  @IsNotEmpty()
  celeb_username: string;
  @IsNumber()
  @IsNotEmpty()
  celebid: number;
  @IsString()
  @IsNotEmpty()
  fan_username: string;
  @IsNumber()
  @IsNotEmpty()
  fanid: number;
  @IsString()
  @IsNotEmpty()
  call_id: string;
}
