import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    Query,
    Res,
    UseGuards,
} from '@nestjs/common';
import { CreateFeedDto } from './dto/create-feeds.dto';
import { UpdateFeedDto } from './dto/update-feeds.dto';
import { FeedService } from './feeds.service';



@Controller('api/v1/feeds')
export class FeedsController {
    constructor(private readonly feedService: FeedService) { }

    @Get()
    async index(@Query('take') take: number = 1,
        @Query('skip') skip: number = 1,) {
        take = take > 20 ? 20 : take;
        return await this.feedService.findAll(take, skip);
    }

    @Post()
    async store(@Body() body: CreateFeedDto) {
        return await this.feedService.store(body);
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.feedService.findOneOrFail(id);
    }

    @Put(':id')
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() body: UpdateFeedDto,
    ) {
        return await this.feedService.update(id, body);
    }

    @Get('image/:fileName')
    findImageByName(@Param('fileName') fileName: string, @Res() res) {
        if (!fileName || ['null', '[null]'].includes(fileName)) return;
        return res.sendFile(fileName, { root: './images' });
    }


    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.feedService.destroy(id);
    }
}
