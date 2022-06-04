import { roomMessage } from "src/entities/roomMessage.entity";
import { User } from "src/entities/user.entity";
export declare class chatRoomDto {
    RoomOwner: string;
    name: string;
    type: string;
    password: string;
    messageId: roomMessage[];
    members: User[];
}
