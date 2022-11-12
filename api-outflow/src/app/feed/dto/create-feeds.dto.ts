import {
   IsNotEmpty,
   IsNumber,
   IsObject,
   IsOptional,
   IsString
} from 'class-validator';
import { AddressEntity } from 'src/app/address/address.entity';
import { Gender } from 'src/app/client/enum/gender.enum';
import { DoctorsEntity } from 'src/app/doctor/doctors.entity';
import { UsersEntity } from 'src/app/user/users.entity';




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