import {
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
  } from 'class-validator';

export class UpdateAddressDto {
    @IsOptional()
    @IsString()
    @MinLength(8)
    @MaxLength(8)
    cep: string;
  
    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(10)
    number: string;
  
    @IsOptional()
    @IsString()
    @MinLength(3)
    street: string;
  
    @IsOptional()
    @IsString()
    @MinLength(3)
    district: string;
  
    @IsOptional()
    @IsString()
    @MinLength(3)
    state: string;
  
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(60)
    city: string;
  
    @IsOptional()
    @IsString()
    @MinLength(3)
    complement: string;
  }