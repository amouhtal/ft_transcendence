import { JwtService } from "@nestjs/jwt";
import { OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { User } from "src/entities/user.entity";
import { messageService } from "src/messages/message.service";
import { UserService } from "src/user/user.service";
import { Repository } from "typeorm";
export declare class chatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private messageServ;
    private userServ;
    private usersRepository;
    private readonly jwtService;
    constructor(messageServ: messageService, userServ: UserService, usersRepository: Repository<User>, jwtService: JwtService);
    handleDisconnect(client: Socket): Promise<void>;
    handleConnection(client: Socket, ...args: any): Promise<void>;
    server: any[];
    handleMessage(client: Socket, text: any): Promise<void>;
    matchmaking(client: Socket, test: any): Promise<"match Found" | "still waiting">;
    playing(): Promise<void>;
}
