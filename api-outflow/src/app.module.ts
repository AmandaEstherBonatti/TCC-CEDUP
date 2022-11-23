import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ClientsModule } from './app/client/clients.module';
import { DoctorsModule } from './app/doctor/doctors.module';
import { UsersModule } from './app/user/users.module';
import { FeedsModule } from './app/feed/feeds.module';
import { AuthModule } from './auth/auth.module';
import { DetailsProfileModule } from './app/details-profile/details-profile.module';
import { MessageController } from './message/message.controller';
import { PusherService } from './message/message.service';
import { HistoricModule } from './app/historic/historic.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      synchronize: true,
    } as TypeOrmModuleOptions), ClientsModule, DoctorsModule, UsersModule, FeedsModule,
    AuthModule, DetailsProfileModule, HistoricModule
  ],
  controllers: [MessageController],
  providers: [PusherService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
})
export class AppModule { }
