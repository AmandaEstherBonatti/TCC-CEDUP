import {

   IsOptional,
} from 'class-validator';




export class UpdateLanguagesDto {
   @IsOptional()
   name: string;
}                               