import {  Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FriendLsit } from "src/entities/friendList.entity";
import { FriendShip } from "src/entities/friendShip.entity";
import { User } from "src/entities/user.entity";
import { UserService } from "src/user/user.service";
import { FriendsController } from "./friends.controller";
import { friendsService } from "./friends.service";


@Module({
    imports: [TypeOrmModule.forFeature([FriendLsit]),TypeOrmModule.forFeature([FriendShip]),TypeOrmModule.forFeature([User]), 
    JwtModule.register({ secret: 'bda1843e3fa6f42e528dd2ec9f088a1d4b181d525faa9caaf65c9b3ca978ef54' })],
    controllers: [FriendsController], 
    providers: [friendsService, UserService]
})


export class FriendsModule{}