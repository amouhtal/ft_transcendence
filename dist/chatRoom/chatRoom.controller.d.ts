import { chatRoomService } from "./chatRoom.service";
import { Request } from 'express';
import { JwtService } from "@nestjs/jwt";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { chatRoom } from "src/entities/chatRoom.entity";
export declare class gID {
    gameId: number;
}
export declare class chatRoomController {
    private readonly RoomService;
    private roomRep;
    private usersRepository;
    private readonly jwtService;
    constructor(RoomService: chatRoomService, roomRep: Repository<chatRoom>, usersRepository: Repository<User>, jwtService: JwtService);
    createRoom(body: any, request: Request): Promise<void>;
    addUser(gameId: any, request: Request): Promise<void>;
}
