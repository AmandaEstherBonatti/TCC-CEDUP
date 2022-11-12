import {
   IsNotEmpty,
   IsNumber,
   IsObject,
   IsOptional,
   IsString
} from 'class-validator';
import { Gender } from '../enum/gender.enum';


export class UpdateClientDto {
   @IsOptional()
   @IsString()
   name: string;

   @IsOptional()
   @IsString()
   lastName: string;

   @IsOptional()
   birthday: string;

   @IsOptional()
   gender: Gender;

   @IsOptional()
   @IsString()
   phoneNumber: string;

}                               