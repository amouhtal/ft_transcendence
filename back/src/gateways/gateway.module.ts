import {  Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { chatRoomModule } from "src/chatRoom/chatRoom.module";
import { chatRoomService } from "src/chatRoom/chatRoom.service";
import { roomMessageService } from "src/chatRoom/roomMessage.service";
import { roomBannedUserService } from "src/chatRoom/roomsBannedUser.service";
import { chatRoom } from "src/entities/chatRoom.entity";
import { FriendLsit } from "src/entities/friendList.entity";
import { FriendShip } from "src/entities/friendShip.entity";
import { Games } from "src/entities/game.entity";
import { liveGame } from "src/entities/liveGame.entity";
import { messages } from "src/entities/message.entity";
import { Notification } from "src/entities/notification.entity";
import { roomMessage } from "src/entities/roomMessage.entity";
import { roomBannedUser } from "src/entities/roomsBannedUser.entity";
import { User } from "src/entities/user.entity";
import { gameModule } from "src/games/game.module";
import { GamesService } from "src/games/game.service";
import { liveGameService } from "src/liveGame/liveGame.service";
import { messageController } from "src/messages/message.controller";
import { MessageModule } from "src/messages/message.module";
import { messageService } from "src/messages/message.service";
import { NotificationModule } from "src/notification/notification.module";
import { notificationService } from "src/notification/notification.service";
import { UserService } from "src/user/user.service";
import { chatGateway } from "./chat.gateway";
import  gamePlayService  from "./gamePlay.service";




@Module({
    imports: [TypeOrmModule.forFeature([User,messages,roomMessage,Games,liveGame, chatRoom,Notification,roomBannedUser]), 
    JwtModule.register({ secret: 'bda1843e3fa6f42e528dd2ec9f088a1d4b181d525faa9caaf65c9b3ca978ef54' }),MessageModule,chatRoomModule,gameModule,NotificationModule],
    // JwtModule.register({ secret: 'bda1843e3fa6f42e528dd2ec9f088a1d4b181d525faa9caaf65c9b3ca978ef54' }),MessageModule,chatRoomModule,gameModule],
    controllers: [messageController], 
    providers: [chatGateway, UserService,messageService ,liveGameService,roomMessageService,GamesService, chatRoomService,notificationService,gamePlayService,roomBannedUserService]
    // providers: [chatGateway, UserService,messageService ,liveGameService,roomMessageService,GamesService, chatRoomService]
})


export class GateWayModule{}