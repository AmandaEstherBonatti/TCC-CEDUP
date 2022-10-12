
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import { LangugesEntity } from './languages.entity';
import { LanguagesController } from './languages.controller';
import { LanguagesService } from './languages.service';




@Module({
  imports: [TypeOrmModule.forFeature([LangugesEntity])],
  controllers: [LanguagesController],
  providers: [LanguagesService],
})
export class LanguagesModule { }