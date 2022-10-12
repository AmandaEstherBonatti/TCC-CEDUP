import { Get, Injectable, NotFoundException, Param, Res } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { CreateSpecialtyDto } from "./dto/create-specialty.dto";
import { UpdateSpecialtyDto } from "./dto/update-specialty.dto";
import { SpecialtyEntity } from "./specialty.entity";

@Injectable()
export class SpecialtyService {
  constructor(
    @InjectRepository(SpecialtyEntity)
    private readonly specialtyRepository: Repository<SpecialtyEntity>,
  ) { }



  async findOneOrFail(id: string) {
    try {
      return await this.specialtyRepository.findOneBy({ id });
    } catch {
      throw new NotFoundException();
    }
  }

  async store(data: CreateSpecialtyDto) {
    const feed = this.specialtyRepository.create(data);
    return await this.specialtyRepository.save(feed);
  }

  async update(id: string, data: UpdateSpecialtyDto) {
    try {
      await this.specialtyRepository.findOneById(id);
    } catch {
      throw new NotFoundException();
    }
    return await this.specialtyRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.specialtyRepository.findOneById(id);
    } catch {
      throw new NotFoundException();
    }
    return await this.specialtyRepository.softDelete({ id });
  }


}


