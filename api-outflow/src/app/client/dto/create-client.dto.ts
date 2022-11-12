import {
   IsNotEmpty,
   IsNumber,
   IsObject,
   IsOptional,
   IsString
} from 'class-validator';
import { Gender } from '../enum/gender.enum';


export class CreateClientDto {
   @IsNotEmpty()
   @IsString()
   name: string;

   @IsNotEmpty()
   @IsString()
   lastName: string;


   @IsNotEmpty()
   birthday: string;

   @IsNotEmpty()
   gender: Gender;

   @IsNotEmpty()
   @IsString()
   phoneNumber: string;

}                               