import { FriendLsit } from "src/entities/friendList.entity";
import { FriendShip } from "src/entities/friendShip.entity";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
export declare class friendsService {
    private friendListRepo;
    private friendShipRepo;
    private userRepo;
    constructor(friendListRepo: Repository<FriendLsit>, friendShipRepo: Repository<FriendShip>, userRepo: Repository<User>);
    findAll(userId: Object): Promise<FriendLsit[] | undefined>;
    sendInv(sender: string, recipent: string): Promise<void>;
    cancellInv(sender: string, recipent: string): Promise<void>;
    acceptFriend(Cuser: string, sender_id: string, id: number): Promise<void>;
    rejectFriend(Cuser: string, recipent: string, id: number): Promise<void>;
    users(userName: any, userId: any): Promise<{
        all_users: any;
        user_rinvite: any;
        user_friends: any;
        user_sinvite: any;
        blocked_friends: any;
    }>;
    friendStatus(userName: string): Promise<{
        friend: string;
        pending: string;
    }>;
}
