import { messageDto } from "src/dto-classes/message.dtp";
import { messageService } from "src/messages/message.service";
export declare class messageController {
    private messageServ;
    constructor(messageServ: messageService);
    saveMessage(message: messageDto): Promise<messageDto & import("../entities/message.entity").messages>;
    getAllMessagesById(userId: number): Promise<void>;
}
