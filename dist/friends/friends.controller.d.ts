import { JwtService } from "@nestjs/jwt";
import { FriendLsit } from "src/entities/friendList.entity";
import { Request } from 'express';
import { Repository } from "typeorm";
import { friendsService } from "./friends.service";
import { FriendShip } from "src/entities/friendShip.entity";
import { User } from "src/entities/user.entity";
export declare class frienduser {
    userName: string;
}
export declare class FriendsController {
    private readonly friendService;
    private userRepo;
    private readonly jwtService;
    constructor(friendService: friendsService, userRepo: Repository<User>, jwtService: JwtService);
    findall(data: FriendShip, request: Request): Promise<{
        all_users: any;
        user_rinvite: any;
        user_friends: any;
        user_sinvite: any;
        blocked_friends: any;
    }>;
    getOne(data: frienduser): Promise<any[] | {
        userInfo: {
            userName: string;
            picture: any;
            country: string;
            winMatch: Promise<any>;
            loserMatch: Promise<any>;
        };
        gameHistory: any[];
    }>;
    findFriends(data: FriendShip, request: Request): Promise<FriendLsit[]>;
    acceptFriend(data: FriendShip, request: Request): Promise<void>;
    sendInv(data: FriendShip, request: Request): Promise<void>;
    cancellInv(data: FriendShip, request: Request): Promise<void>;
    rejectInv(data: FriendShip, request: Request): Promise<void>;
    BlockedFriends(data: frienduser, request: Request): Promise<void>;
    BlockFriend(data: frienduser, request: Request): Promise<void>;
    unBlockFriend(data: frienduser, request: Request): Promise<void>;
    removeFriend(): void;
}
