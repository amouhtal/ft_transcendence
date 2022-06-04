import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/entities/user.entity";
import { roomMessage } from "src/entities/roomMessage.entity";
export declare class roomMessageService {
    private RoomRepository;
    private usersRepository;
    private readonly jwtService;
    constructor(RoomRepository: Repository<roomMessage>, usersRepository: Repository<User>, jwtService: JwtService);
    creatRoomMessage(token: string, body: any): Promise<void>;
    getRoomMessages(roomId: number): Promise<roomMessage[]>;
}
