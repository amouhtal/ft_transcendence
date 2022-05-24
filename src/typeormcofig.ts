import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { RefreshToken } from "./auth/entities/refresh-token.entity";
import { chatRoom } from "./entities/chatRoom.entity";
import { FriendBlocked, FriendLsit } from "./entities/friendList.entity";
import { FriendShip } from "./entities/friendShip.entity";
import { Games } from "./entities/game.entity";
import { messages } from "./entities/message.entity";
import { roomMessage } from "./entities/roomMessage.entity";
import { User } from "./entities/user.entity";

// ['**/*.entity{.ts,.js}']

export const typeOrmConfig : TypeOrmModuleOptions = {
    type: "postgres",
    host: '10.12.11.3',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'trans',
    entities: [User, Games, RefreshToken,FriendLsit, FriendShip, FriendBlocked ,messages, chatRoom,roomMessage],
    synchronize: true
}
