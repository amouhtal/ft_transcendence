"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const chatRoom_entity_1 = require("./chatRoom.entity");
const friendList_entity_1 = require("./friendList.entity");
const liveGame_entity_1 = require("./liveGame.entity");
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "picture", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => friendList_entity_1.FriendLsit, friend => friend.userName),
    __metadata("design:type", Array)
], User.prototype, "friends", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => friendList_entity_1.FriendBlocked, friend => friend.userName),
    __metadata("design:type", Array)
], User.prototype, "friendsBlocked", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "twoFactorAuthenticationSecret", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isTwoFactorAuthenticationEnabled", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "bypassTwoFactorAuthentication", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => chatRoom_entity_1.chatRoom, (room) => room.id),
    (0, typeorm_1.JoinTable)({ name: 'chatIntUser' }),
    __metadata("design:type", Array)
], User.prototype, "chatRooms", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => liveGame_entity_1.liveGame, (live) => live.id, { nullable: true }),
    __metadata("design:type", liveGame_entity_1.liveGame)
], User.prototype, "liveGame", void 0);
User = __decorate([
    (0, typeorm_1.Entity)('Users')
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map