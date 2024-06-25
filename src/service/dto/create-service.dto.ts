import { IsString, IsNotEmpty, ValidateNested, IsArray } from 'class-validator';
import { ServiceDto } from './service.dto';
import { Type } from 'class-transformer';

export class CreateServicesDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  bio: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceDto)
  services: ServiceDto[];
}
