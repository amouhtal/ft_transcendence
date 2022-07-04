import {  Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { UserService } from "src/user/user.service";
import { uploadController } from "./file-uploading.controller";


@Module({
    imports: [JwtModule.register({ secret: process.env.ACCESS_SECRET }),
    MulterModule.register({
        dest: './files',
      }), TypeOrmModule.forFeature([User])],
    controllers: [uploadController], 
    providers: [UserService]
})

export class UploadModule{}