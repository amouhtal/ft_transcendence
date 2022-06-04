import { chatRoom } from './chatRoom.entity';
import { FriendBlocked, FriendLsit } from './friendList.entity';
import { liveGame } from './liveGame.entity';
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    picture: string;
    isActive: boolean;
    friends: FriendLsit[];
    friendsBlocked: FriendBlocked[];
    twoFactorAuthenticationSecret?: string;
    isTwoFactorAuthenticationEnabled: boolean;
    bypassTwoFactorAuthentication: boolean;
    chatRooms: chatRoom[];
    liveGame: liveGame;
}
