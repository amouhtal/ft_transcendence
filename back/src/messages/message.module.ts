import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from "dotenv";
import { messages } from "src/entities/message.entity";
import { User } from "src/entities/user.entity";
import { UserService } from "src/user/user.service";
import { messageController } from "./message.controller";
import { messageService } from "./message.service";

@Module({
    imports: [TypeOrmModule.forFeature([messages]),TypeOrmModule.forFeature([User]), JwtModule.register({ secret: 'bda1843e3fa6f42e528dd2ec9f088a1d4b181d525faa9caaf65c9b3ca978ef54' })],
    controllers: [messageController],
    providers: [messageService, UserService],

})
export class MessageModule {}