import {
   IsNotEmpty,
   IsNumber,
   IsObject,
   IsOptional,
   IsString
} from 'class-validator';
import { AddressEntity } from 'src/app/address/address.entity';
import { Gender } from 'src/app/client/enum/gender.enum';


export class UpdateFeedDto {
   @IsOptional()
   body: string;

   @IsOptional()
   createdAt: Date;

}                               