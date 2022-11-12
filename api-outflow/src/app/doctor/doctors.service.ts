import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  Like,
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
      // order: { createdAt: 'DESC' },
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


  async findPsychologist() {
    return await this.doctorRepository.find({
      where: [
        { kindOfDoctor: 1 },
      ],
    });
  }

  async findPsychoanalyst() {
    return await this.doctorRepository.find({
      where: [
        { kindOfDoctor: 2 },
      ],
    });
  }

  async findTherapist() {
    return await this.doctorRepository.find({
      where: [
        { kindOfDoctor: 3 },
      ],
    });
  }

  async findPsychiatrist() {
    return await this.doctorRepository.find({
      where: [
        { kindOfDoctor: 4 },
      ],
    });
  }

  async find(name: string, type: number) {
    let doctor;
    if (name === '') {
      switch (type) {
        case 1:
          doctor = this.findPsychologist();
          return doctor;
          break;
        case 2:
          doctor = this.findPsychoanalyst();
          return doctor;
          break;
        case 3:
          doctor = this.findTherapist();
          return doctor;
          break;
        case 4:
          doctor = this.findPsychiatrist();
          return doctor;
          break;
        case 5:
          doctor = this.findAll();
          return doctor;
          break;
      }
    } else {
      switch (type) {
        case 1:
          doctor = await this.doctorRepository.find({
            where: [
              { name: Like(`%${name}%`), kindOfDoctor: 1 },
            ],
          });
          return doctor;
          break;
          break;
        case 2:
          doctor = await this.doctorRepository.find({
            where: [
              { name: Like(`%${name}%`), kindOfDoctor: 2 },
            ]
          });
          return doctor;
          break;
        case 3:
          doctor = await this.doctorRepository.find({
            where: [
              { name: Like(`%${name}%`), kindOfDoctor: 3 },
            ]
          });
          return doctor;
          break;
        case 4:
          doctor = await this.doctorRepository.find({
            where: [
              { name: Like(`%${name}%`), kindOfDoctor: 4 },
            ]
          });
          return doctor;
          break;
        case 5:
          doctor = await this.doctorRepository.find({
            where: [
              {
                name: Like(`%${name}%`),
              },
            ],
          });
          return doctor;
      }
    }
  }
}


