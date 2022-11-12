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


export class UpdateFeedDto {
   @IsOptional()
   description: string;

   @IsOptional()
   photoFeed: string;

   @IsOptional()
   Doctor: DoctorsEntity;

}                               