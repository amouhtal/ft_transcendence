import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { chatRoom } from "src/entities/chatRoom.entity";
import { liveGame } from "src/entities/liveGame.entity";
import { roomMessage } from "src/entities/roomMessage.entity";
import { User } from "src/entities/user.entity";
import { chatRoomController } from "./chatRoom.controller";
import { chatRoomService } from "./chatRoom.service";
import { roomMessageController } from "./roomMessage.controller";
import { roomMessageService } from "./roomMessage.service";

@Module({
    imports: [TypeOrmModule.forFeature([chatRoom,User,roomMessage]), JwtModule.register({ secret: process.env.CLIENTSECRET })],
    controllers: [chatRoomController,roomMessageController],
    providers: [chatRoomService,roomMessageService],

})
export class chatRoomModule {}