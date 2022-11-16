import {
   IsNotEmpty,
   IsNumber,
   IsObject,
   IsOptional,
   IsString
} from 'class-validator';
import { DoctorsEntity } from 'src/app/doctor/doctors.entity';




export class CreateFeedDto {
   @IsOptional()
   @IsString()
   description: string;

   @IsOptional()
   @IsString()
   photoFeed: string;

   @IsOptional()
   Doctor: DoctorsEntity;

}                               