import { chatRoom } from "src/entities/chatRoom.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/entities/user.entity";
export declare class chatRoomService {
    private RoomRepository;
    private usersRepository;
    private readonly jwtService;
    constructor(RoomRepository: Repository<chatRoom>, usersRepository: Repository<User>, jwtService: JwtService);
    createRoom(token: string, body: any): Promise<void>;
    getRoomById(gameId: number): Promise<chatRoom>;
}
