"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const refresh_token_entity_1 = require("./auth/entities/refresh-token.entity");
const chatRoom_entity_1 = require("./entities/chatRoom.entity");
const friendList_entity_1 = require("./entities/friendList.entity");
const friendShip_entity_1 = require("./entities/friendShip.entity");
const game_entity_1 = require("./entities/game.entity");
const message_entity_1 = require("./entities/message.entity");
const roomMessage_entity_1 = require("./entities/roomMessage.entity");
const user_entity_1 = require("./entities/user.entity");
exports.typeOrmConfig = {
    type: "postgres",
    host: '10.12.11.3',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'trans',
    entities: [user_entity_1.User, game_entity_1.Games, refresh_token_entity_1.RefreshToken, friendList_entity_1.FriendLsit, friendShip_entity_1.FriendShip, friendList_entity_1.FriendBlocked, message_entity_1.messages, chatRoom_entity_1.chatRoom, roomMessage_entity_1.roomMessage],
    synchronize: true
};
//# sourceMappingURL=typeormcofig.js.map