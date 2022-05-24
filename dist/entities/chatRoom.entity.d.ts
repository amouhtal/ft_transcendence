import { BaseEntity } from "typeorm";
import { roomMessage } from "./roomMessage.entity";
import { User } from "./user.entity";
export declare class chatRoom extends BaseEntity {
    id: number;
    messageId: roomMessage[];
    members: User[];
}
