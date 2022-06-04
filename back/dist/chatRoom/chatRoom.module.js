"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRoomModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const chatRoom_entity_1 = require("../entities/chatRoom.entity");
const roomMessage_entity_1 = require("../entities/roomMessage.entity");
const user_entity_1 = require("../entities/user.entity");
const chatRoom_controller_1 = require("./chatRoom.controller");
const chatRoom_service_1 = require("./chatRoom.service");
const roomMessage_controller_1 = require("./roomMessage.controller");
const roomMessage_service_1 = require("./roomMessage.service");
let chatRoomModule = class chatRoomModule {
};
chatRoomModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([chatRoom_entity_1.chatRoom, user_entity_1.User, roomMessage_entity_1.roomMessage]), jwt_1.JwtModule.register({ secret: process.env.CLIENTSECRET })],
        controllers: [chatRoom_controller_1.chatRoomController, roomMessage_controller_1.roomMessageController],
        providers: [chatRoom_service_1.chatRoomService, roomMessage_service_1.roomMessageService],
    })
], chatRoomModule);
exports.chatRoomModule = chatRoomModule;
//# sourceMappingURL=chatRoom.module.js.map