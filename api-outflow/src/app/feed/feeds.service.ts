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
    // return this.feedRepository
    //   .createQueryBuilder('feed_post_entity')
    //   .leftJoinAndSelect('feed_post_entity.User', 'User')
    //   .orderBy('feed_post_entity. createdAt', 'DESC')
    //   .take(take)
    //   .skip(skip)
    //   .getMany()


    return await this.feedRepository.find({
      select: ['id', 'description', 'photoFeed', 'createdAt'],
      relations: ['Doctor']
    });

    // return await this.feedRepository.query('select feed_post_entity.id, users_entity.photo, feed_post_entity.description,feed_post_entity.photo,feed_post_entity.createdAt, ' +
    //   'feed_post_entity.userId, ' +
    //   'doctors_entity.id,doctors_entity.name, doctors_entity.lastName from users_entity  ' +
    //   'left join feed_post_entity on feed_post_entity.userId = users_entity.id ' +
    //   'left join doctors_entity on doctors_entity.userId = users_entity.id')


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


