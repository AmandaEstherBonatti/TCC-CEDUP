import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString
} from 'class-validator';
import { ClientEntity } from 'src/app/client/clients.entity';
import { DoctorsEntity } from 'src/app/doctor/doctors.entity';
import { Role } from '../enum/role.enum';

export class CreateUserDto {

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  role: Role;

  @IsOptional()
  @IsObject()
  Client: ClientEntity

  @IsOptional()
  @IsObject()
  Doctor: DoctorsEntity

}