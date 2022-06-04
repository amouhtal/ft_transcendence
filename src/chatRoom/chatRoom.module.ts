import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { chatRoom } from "src/entities/chatRoom.entity";
import { User } from "src/entities/user.entity";
import { chatRoomController } from "./chatRoom.controller";
import { chatRoomService } from "./chatRoom.service";

@Module({
    imports: [TypeOrmModule.forFeature([chatRoom,User]), JwtModule.register({ secret: process.env.CLIENTSECRET })],
    controllers: [chatRoomController],
    providers: [chatRoomService],

})
export class chatRoomModule {}