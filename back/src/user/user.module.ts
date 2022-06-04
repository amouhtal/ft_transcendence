import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from "dotenv";
import { chatRoomModule } from "src/chatRoom/chatRoom.module";
import { roomMessageController } from "src/chatRoom/roomMessage.controller";
import { roomMessageService } from "src/chatRoom/roomMessage.service";
import { Games } from "src/entities/game.entity";
import { liveGame } from "src/entities/liveGame.entity";
import { messages } from "src/entities/message.entity";
import { roomMessage } from "src/entities/roomMessage.entity";
import { User } from "src/entities/user.entity";
import { GamesService } from "src/games/game.service";
import { chatGateway } from "src/gateways/chat.gateway";
import { liveGameService } from "src/liveGame/liveGame.service";
import { messageController } from "src/messages/message.controller";
import { messageRepository } from "src/messages/message.repository";
import { messageService } from "src/messages/message.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [TypeOrmModule.forFeature([User,messageRepository,liveGame,Games,roomMessage]), JwtModule.register({ secret: process.env.CLIENTSECRET }),chatRoomModule],
    controllers: [UserController,messageController,roomMessageController],
    providers: [UserService,messageService,chatGateway,liveGameService,GamesService,roomMessageService],
    exports: [UserService],

})
export class UserModule {}