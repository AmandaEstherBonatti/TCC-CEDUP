import { Get, Injectable, NotFoundException, Param, Res } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { CreateFeedDto } from "./dto/create-feeds.dto";
import { UpdateFeedDto } from "./dto/update-feeds.dto";
import { FeedPostEntity } from "./feeds.entity";




@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedPostEntity)
    private readonly feedRepository: Repository<FeedPostEntity>,
  ) { }

  async findAll() {
    try {
      return await this.feedRepository.find({
        select: ['id', 'description', 'photoFeed', 'createdAt'],
        relations: ['Doctor'],
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOneOrFail(id: string) {
    try {
      return await this.feedRepository.findOneBy({ id });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(data: CreateFeedDto) {
    try {
      const feed = this.feedRepository.create(data);
      return await this.feedRepository.save(feed);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, data: UpdateFeedDto) {
    try {
      await this.feedRepository.findOneById(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
    return await this.feedRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.feedRepository.findOneById(id);
    } catch {
      throw new NotFoundException();
    }
    return await this.feedRepository.softDelete({ id });
  }


}


