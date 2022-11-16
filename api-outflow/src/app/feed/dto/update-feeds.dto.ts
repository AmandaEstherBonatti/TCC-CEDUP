import {
   IsNotEmpty,
   IsNumber,
   IsObject,
   IsOptional,
   IsString
} from 'class-validator';
import { DoctorsEntity } from 'src/app/doctor/doctors.entity';


export class UpdateFeedDto {
   @IsOptional()
   description: string;

   @IsOptional()
   photoFeed: string;

   @IsOptional()
   Doctor: DoctorsEntity;

}                               