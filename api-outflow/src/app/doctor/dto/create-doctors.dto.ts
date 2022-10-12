import {
   IsNotEmpty,
   IsNumber,
   IsObject,
   IsOptional,
   IsString
} from 'class-validator';
import { AddressEntity } from 'src/app/address/address.entity';
import { Gender } from 'src/app/client/enum/gender.enum';
import { UsersEntity } from 'src/app/user/users.entity';
import { KindOfDoctor } from '../enum/kind_of_doctor.enum';
import { MainExpectation } from '../enum/main-expectation.enum';
import { TimeExperience } from '../enum/time-experience.enum';

export class CreateDoctorDto {
   @IsNotEmpty()
   @IsString()
   name: string;

   @IsNotEmpty()
   @IsString()
   lastName: string;

   @IsNotEmpty()
   @IsString()
   cpf: string;




   @IsNotEmpty()
   gender: Gender;

   @IsNotEmpty()
   timeExperience: TimeExperience;

   @IsNotEmpty()
   mainExpectation: MainExpectation;

   @IsNotEmpty()
   kindOfDoctor: KindOfDoctor;

   @IsNotEmpty()
   @IsString()
   phoneNumber: string;

   @IsOptional()
   crp: string;

   @IsOptional()
   Address: AddressEntity;

   @IsNotEmpty()
   User: UsersEntity;



}     
