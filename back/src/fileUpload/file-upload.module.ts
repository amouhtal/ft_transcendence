import {  Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { UserService } from "src/user/user.service";
import { uploadController } from "./file-uploading.controller";




@Module({
    imports: [JwtModule.register({ secret: 'bda1843e3fa6f42e528dd2ec9f088a1d4b181d525faa9caaf65c9b3ca978ef54' }),
    MulterModule.register({
        dest: './files',
      }), TypeOrmModule.forFeature([User])],
    controllers: [uploadController], 
    providers: [UserService]
})


export class UploadModule{}