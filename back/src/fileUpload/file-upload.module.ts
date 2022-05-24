import {  Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { uploadController } from "./file-uploading.controller";




@Module({
    imports: [ MulterModule.register({
        dest: './files',
      }), TypeOrmModule.forFeature([User])],
    controllers: [uploadController], 
    providers: []
})


export class UploadModule{}