import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from "dotenv";
import { liveGame } from "src/entities/liveGame.entity";
import { Notification } from "src/entities/notification.entity";
import { User } from "src/entities/user.entity";
import { chatGateway } from "src/gateways/chat.gateway";
import { MessageModule } from "src/messages/message.module";
import { UserService } from "src/user/user.service";
import { notificationController } from "./notification.controller";
import { notificationService } from "./notification.service";

@Module({
    imports: [TypeOrmModule.forFeature([Notification,User]), JwtModule.register({ secret: 'bda1843e3fa6f42e528dd2ec9f088a1d4b181d525faa9caaf65c9b3ca978ef54' })],
    controllers: [notificationController],
    providers: [notificationService,UserService],

})
export class NotificationModule {}