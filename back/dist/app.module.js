"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const friends_module_1 = require("./friends/friends.module");
const game_module_1 = require("./games/game.module");
const typeormcofig_1 = require("./typeormcofig");
const user_module_1 = require("./user/user.module");
const mail_module_1 = require("./mail/mail.module");
const chatRoom_module_1 = require("./chatRoom/chatRoom.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [chatRoom_module_1.chatRoomModule, user_module_1.UserModule, game_module_1.gameModule, auth_module_1.AuthModule, friends_module_1.FriendsModule, mail_module_1.MailModule, typeorm_1.TypeOrmModule.forRoot(typeormcofig_1.typeOrmConfig), jwt_1.JwtModule.register({ secret: 'bda1843e3fa6f42e528dd2ec9f088a1d4b181d525faa9caaf65c9b3ca978ef54' }), mail_module_1.MailModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map