import {
   IsNotEmpty,
   IsNumber,
   IsObject,
   IsOptional,
   IsString
} from 'class-validator';
import { Gender } from 'src/app/client/enum/gender.enum';


export class UpdateDoctorDto {
   @IsOptional()
   @IsString()
   name: string;

   @IsOptional()
   @IsString()
   lastName: string;


   @IsOptional()
   gender: Gender;

   @IsOptional()
   @IsString()
   phoneNumber: string;

   @IsOptional()
   localClinic: boolean;

}                               