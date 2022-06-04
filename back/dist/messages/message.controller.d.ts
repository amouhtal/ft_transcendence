import { messageDto } from "src/dto-classes/message.dtp";
import { messageService } from "src/messages/message.service";
import { Request } from 'express';
import { Repository } from "typeorm";
import { User } from "src/entities/user.entity";
import { JwtService } from "@nestjs/jwt";
export declare class uDto {
    userName: string;
}
export declare class messageController {
    private messageServ;
    private usersRepository;
    private readonly jwtService;
    constructor(messageServ: messageService, usersRepository: Repository<User>, jwtService: JwtService);
    saveMessage(message: messageDto): Promise<messageDto & import("../entities/message.entity").messages>;
    getAllMessagesById(token: any, request: Request): Promise<any>;
    getConv(reciver: uDto, request: Request): Promise<any>;
}
