import {
   IsNotEmpty,

} from 'class-validator';
import { DetailsProfileEntity } from 'src/app/details-profile/details-profile.entity';





export class CreateLanguagesDto {

   @IsNotEmpty()
   name: string;

   @IsNotEmpty()
   DetailsProfile: DetailsProfileEntity;

}                               