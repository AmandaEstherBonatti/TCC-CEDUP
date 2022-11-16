
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import { DetailsProfileEntity } from './details-profile.entity';
import { DetailsProfileService } from './details-profile.service';
import { DetailsProfileController } from './details-profile.controller';



@Module({
  imports: [TypeOrmModule.forFeature([DetailsProfileEntity])],
  controllers: [DetailsProfileController],
  providers: [DetailsProfileService],
})
export class DetailsProfileModule { }