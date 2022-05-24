import { messageDto } from 'src/dto-classes/message.dtp';
import { messages } from 'src/entities/message.entity';
import { messageRepository } from 'src/messages/message.repository';
export declare class messageService {
    private messageRep;
    constructor(messageRep: messageRepository);
    getMessageById(username: number): Promise<messages>;
    createMessage(message: messageDto): Promise<messageDto & messages>;
    getConversation(SId: string, RId: string): Promise<any>;
}
