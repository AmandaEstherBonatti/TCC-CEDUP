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
    try {
      return await this.doctorRepository.find(options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOneOrFail(id: string) {
    try {
      return await this.doctorRepository.findOneBy({ id });
    } catch {
      throw new NotFoundException();
    }
  }

  async store(data: CreateDoctorDto) {
    try {
      const doctor = this.doctorRepository.create(data);
      return await this.doctorRepository.save(doctor);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, data: UpdateDoctorDto) {
    try {
      await this.doctorRepository.findOneById(id);
    } catch (error) {
      throw new NotFoundException(error.message);
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
    try {
      return await this.doctorRepository.find({
        where: [
          { kindOfDoctor: 1 },
        ],
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findPsychoanalyst() {
    try {
      return await this.doctorRepository.find({
        where: [
          { kindOfDoctor: 2 },
        ],
      });
    } catch (error) {
      throw new NotFoundException(error.message);

    }
  }

  async findTherapist() {
    try {
      return await this.doctorRepository.find({
        where: [
          { kindOfDoctor: 3 },
        ],
      });
    } catch (error) {
      throw new NotFoundException(error.message);

    }
  }

  async findPsychiatrist() {
    try {
      return await this.doctorRepository.find({
        where: [
          { kindOfDoctor: 4 },
        ],
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async find(name: string, type: number) {
    let doctor;
    try {
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
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}


