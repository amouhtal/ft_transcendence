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
    imports: [TypeOrmModule.forFeature([FriendLsit, FriendShip, User]), JwtModule.register({ secret: process.env.ACCESS_SECRET })],
    controllers: [FriendsController], 
    providers: [friendsService, UserService]
})


export class FriendsModule{}