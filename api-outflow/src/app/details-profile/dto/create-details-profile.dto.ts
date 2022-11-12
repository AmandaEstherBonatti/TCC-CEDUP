import {
   IsNotEmpty,
   IsNumber,
   IsObject,
   IsOptional,
   IsString
} from 'class-validator';

import { UsersEntity } from 'src/app/user/users.entity';




export class CreateDetailsProfileDto {

   @IsOptional()
   hourlyRate: string;

   @IsOptional()
   description: string;


   @IsOptional()
   specialty: string;

   @IsNotEmpty()
   User: UsersEntity;

}                               