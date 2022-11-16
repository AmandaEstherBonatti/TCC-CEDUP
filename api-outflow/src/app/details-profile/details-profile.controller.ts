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
import { DetailsProfileService } from './details-profile.service';
import { CreateDetailsProfileDto } from './dto/create-details-profile.dto';
import { UpdateDetailsProfileDto } from './dto/update-details-profile.dto';




@Controller('api/v1/details-profile')
export class DetailsProfileController {
    constructor(private readonly detailsProfileService: DetailsProfileService) { }

    @Post()
    async store(@Body() body: CreateDetailsProfileDto) {
        return await this.detailsProfileService.store(body);
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.detailsProfileService.findOneOrFail(id);
    }

    @Put(':id')
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() body: UpdateDetailsProfileDto,
    ) {
        return await this.detailsProfileService.update(id, body);
    }


    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.detailsProfileService.destroy(id);
    }
}
