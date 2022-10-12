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

  async findAll(take: number = 10, skip: number = 0) {
    return this.feedRepository
      .createQueryBuilder('post')
      .innerJoinAndSelect('post.user', 'user')
      .orderBy('post.createdAt', 'DESC')
      .take(take)
      .skip(skip)
      .getMany()

  }

  async findOneOrFail(id: string) {
    try {
      return await this.feedRepository.findOneBy({ id });
    } catch {
      throw new NotFoundException();
    }
  }

  async store(data: CreateFeedDto) {
    const feed = this.feedRepository.create(data);
    return await this.feedRepository.save(feed);
  }

  async update(id: string, data: UpdateFeedDto) {
    try {
      await this.feedRepository.findOneById(id);
    } catch {
      throw new NotFoundException();
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


