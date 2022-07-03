import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [TypeOrmModule.forFeature([User]),
    JwtModule.register({ secret: process.env.ACCESS_SECRET })],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],

})

export class UserModule {}