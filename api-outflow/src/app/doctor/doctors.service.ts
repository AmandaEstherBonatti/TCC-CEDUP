import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { DoctorsEntity } from "./doctors.entity";
import { CreateDoctorDto } from "./dto/create-doctors.dto";
import { UpdateDoctorDto } from "./dto/update-doctors.dto";



@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(DoctorsEntity)
    private readonly doctorRepository: Repository<DoctorsEntity>,
  ) { }

  async findAll() {
    const options: FindManyOptions = {
      order: { createdAt: 'DESC' },
    };
    return await this.doctorRepository.find(options);
  }

  async findOneOrFail(id: string) {
    try {
      return await this.doctorRepository.findOneBy({ id });
    } catch {
      throw new NotFoundException();
    }
  }

  async store(data: CreateDoctorDto) {
    const doctor = this.doctorRepository.create(data);
    return await this.doctorRepository.save(doctor);
  }

  async update(id: string, data: UpdateDoctorDto) {
    try {
      await this.doctorRepository.findOneById(id);
    } catch {
      throw new NotFoundException();
    }
    return await this.doctorRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.doctorRepository.findOneById(id);
    } catch {
      throw new NotFoundException();
    }
    return await this.doctorRepository.softDelete({ id });
  }
}


