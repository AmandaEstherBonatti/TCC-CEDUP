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
    UseGuards,
} from '@nestjs/common';
import { DoctorService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctors.dto';
import { UpdateDoctorDto } from './dto/update-doctors.dto';


@Controller('api/v1/doctors')
export class DoctorsController {
    constructor(private readonly doctorService: DoctorService) { }

    @Get()
    async index() {
        return await this.doctorService.findAll();
    }

    @Post()
    async store(@Body() body: CreateDoctorDto) {
        return await this.doctorService.store(body);
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.doctorService.findOneOrFail(id);
    }

    @Put(':id')
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() body: UpdateDoctorDto,
    ) {
        return await this.doctorService.update(id, body);
    }

    @Post('find')
    async find(@Body() body: any) {
        return await this.doctorService.find(body.name, body.type);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.doctorService.destroy(id);
    }
}
