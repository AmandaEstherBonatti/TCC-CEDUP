

import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import { HistoricEntity } from './historic.entity';
import { HistoricController } from './historic.controller';
import { HistoricService } from './historic.service';

@Module({
  imports: [TypeOrmModule.forFeature([HistoricEntity])],
  controllers: [HistoricController],
  providers: [HistoricService],
  exports: [HistoricService],
})
export class HistoricModule { }