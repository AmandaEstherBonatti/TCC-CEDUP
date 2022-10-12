import { Get, Injectable, NotFoundException, Param, Res } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { DetailsProfileEntity } from "./details-profile.entity";
import { CreateDetailsProfileDto } from "./dto/create-details-profile.dto";
import { UpdateDetailsProfileDto } from "./dto/update-details-profile.dto";





@Injectable()
export class DetailsProfileService {
  constructor(
    @InjectRepository(DetailsProfileEntity)
    private readonly detailsProfileRepository: Repository<DetailsProfileEntity>,
  ) { }



  async findOneOrFail(id: string) {
    try {
      return await this.detailsProfileRepository.findOneBy({ id });
    } catch {
      throw new NotFoundException();
    }
  }

  async store(data: CreateDetailsProfileDto) {
    const feed = this.detailsProfileRepository.create(data);
    return await this.detailsProfileRepository.save(feed);
  }

  async update(id: string, data: UpdateDetailsProfileDto) {
    try {
      await this.detailsProfileRepository.findOneById(id);
    } catch {
      throw new NotFoundException();
    }
    return await this.detailsProfileRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.detailsProfileRepository.findOneById(id);
    } catch {
      throw new NotFoundException();
    }
    return await this.detailsProfileRepository.softDelete({ id });
  }


}


