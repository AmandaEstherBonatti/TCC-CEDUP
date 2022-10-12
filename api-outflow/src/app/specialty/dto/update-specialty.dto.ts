import {

   IsOptional,
} from 'class-validator';




export class UpdateSpecialtyDto {
   @IsOptional()
   name: string;
}                               