import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { diskStorage } from 'multer';
import { User } from 'src/entities/user.entity';
import { editFileName, imageFileFilter } from './file-upload.utis';
import { Repository } from 'typeorm';
import { JwtAuthGuard } from 'src/guards/jwt-auth.gguard';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';

@Controller('upload')
export class uploadController {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly userService: UserService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file, @Req() request: Request) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    const jwt = request.headers.authorization.replace('Bearer ', '');
    let user: User = await this.userService.getUserJwt(jwt);
    let root = 'http://localhost:3001/upload/' + response.filename;
    await this.userRepo
      .createQueryBuilder('Users')
      .update('User')
      .set({ picture: root })
      .where('userName = :userName', { userName: user.userName })
      .execute();

    return response;
  }

  // @Post('multiple')
  // @UseInterceptors(
  //   FilesInterceptor('image', 20, {
  //     storage: diskStorage({
  //       destination: './files',
  //       filename: editFileName,
  //     }),
  //     fileFilter: imageFileFilter,
  //   }),
  // )
  // async uploadMultipleFiles(@UploadedFiles() files) {
  //   const response = [];
  //   files.forEach((file) => {
  //     const fileReponse = {
  //       originalname: file.originalname,
  //       filename: file.filename,
  //     };
  //     response.push(fileReponse);
  //   });
  //   return response;
  // }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './files' });
  }
}
