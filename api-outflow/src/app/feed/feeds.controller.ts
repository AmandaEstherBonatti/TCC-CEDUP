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
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName } from '../user/utils/file-upload-rename';
import { imageFileFilter } from '../user/utils/photo-upload-validator';
import { CreateFeedDto } from './dto/create-feeds.dto';
import { UpdateFeedDto } from './dto/update-feeds.dto';
import { FeedService } from './feeds.service';
import { diskStorage } from 'multer';
import { Public } from 'src/auth/public.decorator';



@Controller('api/v1/feeds')
export class FeedsController {
    constructor(private readonly feedService: FeedService) { }

    @Get()
    async index() {
        return await this.feedService.findAll();
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

    @Public()
    @Post('file/upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: '../files',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async uploadedFile(@UploadedFile() file) {
        const response = {
            originalname: file.originalname,
            filename: file.filename,
        };
        return response;
    }

    @Public()
    @Get('file/upload/:imgpath')
    seeUploadedFile(@Param('imgpath') image, @Res() res) {
        let url = image.split('.')
        return res.sendFile(image, { root: '../files' });
    }
}
