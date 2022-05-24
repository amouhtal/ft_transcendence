import { chatRoom } from './chatRoom.entity';
import { FriendBlocked, FriendLsit } from './friendList.entity';
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
}
