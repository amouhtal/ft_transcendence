import { JwtService } from "@nestjs/jwt";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { roomMessage } from "src/entities/roomMessage.entity";
import { roomMessageService } from "./roomMessage.service";
export declare class roomMessageController {
    private readonly RoomService;
    private roomRep;
    private usersRepository;
    private readonly jwtService;
    constructor(RoomService: roomMessageService, roomRep: Repository<roomMessage>, usersRepository: Repository<User>, jwtService: JwtService);
}
