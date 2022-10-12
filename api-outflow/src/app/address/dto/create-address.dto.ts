import { ClientEntity } from './../../client/clients.entity';
import {
    IsDefined,
    IsNotEmpty,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
    Length,
    MaxLength,
    MinLength,
  } from 'class-validator';

export class CreateAddressDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(8)
    cep: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(10)
    number: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    street: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    district: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    state: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    city: string;
  
    @IsOptional()
    @IsString()
    @MinLength(3)
    complement: string;
  
    @IsNotEmpty()
    @IsObject()
    Client: ClientEntity;
  }
