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
import { CreateLanguagesDto } from './dto/create-languages.dto';
import { UpdateLanguagesDto } from './dto/update-languages.dto';
import { LanguagesService } from "./languages.service";

@Controller('api/languages')
export class LanguagesController {
    constructor(private readonly languagesService: LanguagesService) { }

    @Post()
    async store(@Body() body: CreateLanguagesDto) {
        return await this.languagesService.store(body);
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.languagesService.findOneOrFail(id);
    }

    @Put(':id')
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() body: UpdateLanguagesDto,
    ) {
        return await this.languagesService.update(id, body);
    }


    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.languagesService.destroy(id);
    }
}
