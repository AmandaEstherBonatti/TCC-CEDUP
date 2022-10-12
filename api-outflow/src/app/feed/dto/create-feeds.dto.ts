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




export class CreateFeedDto {
   @IsNotEmpty()
   @IsString()
   body: string;

   @IsNotEmpty()
   createdAt: Date;

   @IsNotEmpty()
   User: UsersEntity;

}                               