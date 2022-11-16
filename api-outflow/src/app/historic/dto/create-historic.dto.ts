import { ClientEntity } from '../../client/clients.entity';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { DoctorsEntity } from 'src/app/doctor/doctors.entity';

export class CreateHistoricDto {

  @IsNotEmpty()
  @IsObject()
  Client: ClientEntity;

  @IsNotEmpty()
  @IsObject()
  Doctor: DoctorsEntity;
}
