import { ClientService } from './clients.service';
import { ClientsController } from './clients.controller';
import { ClientEntity } from './clients.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";

@Module({
    imports: [TypeOrmModule.forFeature([ClientEntity])],
    controllers: [ClientsController],
    providers: [ClientService],
    exports: [ClientService],
  })
  export class ClientsModule { }