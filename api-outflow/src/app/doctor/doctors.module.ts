
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import { DoctorsEntity } from './doctors.entity';
import { DoctorsController } from './doctors.controller';
import { DoctorService } from './doctors.service';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorsEntity])],
  controllers: [DoctorsController],
  providers: [DoctorService],
  exports: [DoctorService],
})
export class DoctorsModule { }