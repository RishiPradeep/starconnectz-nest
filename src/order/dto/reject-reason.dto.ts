import { IsNotEmpty, IsString } from 'class-validator';

export class RejectReasonDto {
  @IsString()
  @IsNotEmpty()
  reason: string;
}
