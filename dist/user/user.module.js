"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entities/user.entity");
const chat_gateway_1 = require("../gateways/chat.gateway");
const message_controller_1 = require("../messages/message.controller");
const message_repository_1 = require("../messages/message.repository");
const message_service_1 = require("../messages/message.service");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, message_repository_1.messageRepository]), jwt_1.JwtModule.register({ secret: process.env.CLIENTSECRET })],
        controllers: [user_controller_1.UserController, message_controller_1.messageController],
        providers: [user_service_1.UserService, message_service_1.messageService, chat_gateway_1.chatGateway],
        exports: [user_service_1.UserService],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map