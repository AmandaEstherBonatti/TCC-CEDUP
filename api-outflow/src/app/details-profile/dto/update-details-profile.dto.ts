import {
   IsNotEmpty,
   IsNumber,
   IsObject,
   IsOptional,
   IsString
} from 'class-validator';

import { LangugesEntity } from 'src/app/languages/languages.entity';
import { SpecialtyEntity } from 'src/app/specialty/specialty.entity';


export class UpdateDetailsProfileDto {
   @IsOptional()
   hourlyRate: string;

   @IsOptional()
   description: string;

   @IsOptional()
   Languages: LangugesEntity[];

   @IsOptional()
   Specialtys: SpecialtyEntity[];

}                               