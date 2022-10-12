
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import { SpecialtyEntity } from './specialty.entity';
import { SpecialtyService } from './specialty.service';
import { SpecialtyController } from './specialty.controller';





@Module({
  imports: [TypeOrmModule.forFeature([SpecialtyEntity])],
  controllers: [SpecialtyController],
  providers: [SpecialtyService],
})
export class SpecialtyModule { }