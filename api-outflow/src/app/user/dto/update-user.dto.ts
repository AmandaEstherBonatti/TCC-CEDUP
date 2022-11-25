import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString
} from 'class-validator';
import { ClientEntity } from 'src/app/client/clients.entity';

export class UpdateUserDto {

  @IsOptional()
  @IsString()
  photo: string;

}