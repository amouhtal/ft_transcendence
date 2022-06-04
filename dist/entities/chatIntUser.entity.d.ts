import { BaseEntity } from "typeorm";
export declare class chatIntUser extends BaseEntity {
    id: number;
    chatId: string;
    userId: string;
}
