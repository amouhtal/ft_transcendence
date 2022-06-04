import { BaseEntity } from "typeorm";
export declare class roomMessage extends BaseEntity {
    id: number;
    senderId: string;
    message: string;
    roomId: number;
}
