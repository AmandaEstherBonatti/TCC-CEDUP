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
} from '@nestjs/common';
import { CreateHistoricDto } from './dto/create-historic.dto';
import { UpdateHistoricDto } from './dto/update-historic.dto';
import { HistoricService } from './historic.service';


@Controller('/api/v1/historic')
export class HistoricController {
  constructor(private readonly historicService: HistoricService) { }

  @Get()
  async index() {
    return await this.historicService.findAll();
  }

  @Get('doctor/:id')
  async findByDoctor(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.historicService.findByDoctor(id)
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.historicService.findOneOrFail(id);
  }

  @Post()
  async store(@Body() body: CreateHistoricDto) {
    return await this.historicService.store(body);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateHistoricDto,) {
    return await this.historicService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.historicService.destroy(id);
  }
}
