import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { diskStorage } from 'multer';
import { User } from 'src/entities/user.entity';
import { editFileName, imageFileFilter } from './file-upload.utis';
import { Repository } from 'typeorm';

@Controller('upload')
export class uploadController {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
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
    console.log(file.buffer);

    // .set({ firstName: "Timber", lastName: "Saw" })
    // .where("id = :id", { id: 1 })
    // .execute()
    let root = 'http://10.12.10.1/:3000/upload/' + response.filename;
    // var os = require("os");
    // os.ipAddress();
    // console.log( "hos", os.ipAddress());
    // .where("id = :id", { id: 1 })
    // http://localhost:3000/upload/am-9dac.jpg
    this.userRepo.createQueryBuilder("Users").update("User").set({picture: root}).where("id = :id", { id: 23 }).execute();

    return response;
  }

  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files) {
    const response = [];
    files.forEach((file) => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return response;
  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './files' });
  }
}
