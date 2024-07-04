import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMeetingDto {
  @IsString()
  @IsNotEmpty()
  celeb_username: string;
  @IsString()
  @IsNotEmpty()
  fan_username: string;
  @IsNumber()
  @IsNotEmpty()
  orderid: number;
  @IsString()
  @IsNotEmpty()
  callid: string;
}
