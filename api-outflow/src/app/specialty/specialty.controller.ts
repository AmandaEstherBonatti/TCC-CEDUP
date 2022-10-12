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
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { SpecialtyService } from './specialty.service';


@Controller('api/specialty')
export class SpecialtyController {
    constructor(private readonly specialtyService: SpecialtyService) { }

    @Post()
    async store(@Body() body: CreateSpecialtyDto) {
        return await this.specialtyService.store(body);
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.specialtyService.findOneOrFail(id);
    }

    @Put(':id')
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() body: UpdateSpecialtyDto,
    ) {
        return await this.specialtyService.update(id, body);
    }


    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.specialtyService.destroy(id);
    }
}
