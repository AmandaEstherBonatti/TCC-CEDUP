import { Get, Injectable, NotFoundException, Param, Res } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { CreateLanguagesDto } from "./dto/create-languages.dto";
import { UpdateLanguagesDto } from "./dto/update-languages.dto";
import { LangugesEntity } from "./languages.entity";


@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(LangugesEntity)
    private readonly languagesRepository: Repository<LangugesEntity>,
  ) { }



  async findOneOrFail(id: string) {
    try {
      return await this.languagesRepository.findOneBy({ id });
    } catch {
      throw new NotFoundException();
    }
  }

  async store(data: CreateLanguagesDto) {
    const feed = this.languagesRepository.create(data);
    return await this.languagesRepository.save(feed);
  }

  async update(id: string, data: UpdateLanguagesDto) {
    try {
      await this.languagesRepository.findOneById(id);
    } catch {
      throw new NotFoundException();
    }
    return await this.languagesRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.languagesRepository.findOneById(id);
    } catch {
      throw new NotFoundException();
    }
    return await this.languagesRepository.softDelete({ id });
  }


}


