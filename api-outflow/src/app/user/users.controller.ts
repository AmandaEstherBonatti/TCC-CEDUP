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
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { diskStorage } from 'multer';
import { UsersService } from './users.service';
import { editFileName } from './utils/file-upload-rename';
import { imageFileFilter } from './utils/photo-upload-validator';
import { Public } from 'src/auth/public.decorator';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  async index() {
    return await this.usersService.findAll();
  }

  @Public()
  @Post()
  async store(@Body() body: CreateUserDto) {
    return await this.usersService.store(body);
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.findOneOrFail(id);
  }


  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateUserDto,
  ) {
    return await this.usersService.update(id, body);
  }



  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.usersService.destroy(id);
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