import {
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ClientEntity } from 'src/app/client/clients.entity';
import { DoctorsEntity } from 'src/app/doctor/doctors.entity';

export class UpdateHistoricDto {
  @IsOptional()
  @IsObject()
  Client: ClientEntity;

  @IsOptional()
  @IsObject()
  Doctor: DoctorsEntity;
}