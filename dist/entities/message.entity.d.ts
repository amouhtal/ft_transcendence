import { BaseEntity } from "typeorm";
export declare class messages extends BaseEntity {
    id: number;
    senderId: string;
    reciverId: string;
    message: string;
    time: Date;
}
