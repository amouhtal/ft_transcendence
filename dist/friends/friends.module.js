"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendsModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const friendList_entity_1 = require("../entities/friendList.entity");
const friendShip_entity_1 = require("../entities/friendShip.entity");
const user_entity_1 = require("../entities/user.entity");
const friends_controller_1 = require("./friends.controller");
const friends_service_1 = require("./friends.service");
let FriendsModule = class FriendsModule {
};
FriendsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([friendList_entity_1.FriendLsit]), typeorm_1.TypeOrmModule.forFeature([friendShip_entity_1.FriendShip]), typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]), jwt_1.JwtModule.register({ secret: 'bda1843e3fa6f42e528dd2ec9f088a1d4b181d525faa9caaf65c9b3ca978ef54' })],
        controllers: [friends_controller_1.FriendsController],
        providers: [friends_service_1.friendsService]
    })
], FriendsModule);
exports.FriendsModule = FriendsModule;
//# sourceMappingURL=friends.module.js.map