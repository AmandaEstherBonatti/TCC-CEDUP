
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import { FeedPostEntity } from './feeds.entity';
import { FeedsController } from './feeds.controller';
import { FeedService } from './feeds.service';


@Module({
  imports: [TypeOrmModule.forFeature([FeedPostEntity])],
  controllers: [FeedsController],
  providers: [FeedService],
})
export class FeedsModule { }