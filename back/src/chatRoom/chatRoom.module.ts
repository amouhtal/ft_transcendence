import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { chatRoom } from "src/entities/chatRoom.entity";
import { liveGame } from "src/entities/liveGame.entity";
import { roomMessage } from "src/entities/roomMessage.entity";
import { roomBannedUser } from "src/entities/roomsBannedUser.entity";
import { User } from "src/entities/user.entity";
import { UserService } from "src/user/user.service";
import { chatRoomController } from "./chatRoom.controller";
import { chatRoomService } from "./chatRoom.service";
import { roomMessageController } from "./roomMessage.controller";
import { roomMessageService } from "./roomMessage.service";
import { roomBannedUsersController } from "./roomsBannedUser.controller";
import { roomBannedUserService } from "./roomsBannedUser.service";

@Module({
    imports: [TypeOrmModule.forFeature([chatRoom,User,roomMessage,roomBannedUser]), JwtModule.register({ secret: process.env.CLIENTSECRET })],
    controllers: [chatRoomController,roomMessageController,roomBannedUsersController],
    providers: [chatRoomService,roomMessageService,UserService,roomBannedUserService],

})
export class chatRoomModule {}