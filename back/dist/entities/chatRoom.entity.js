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
exports.chatRoom = void 0;
const typeorm_1 = require("typeorm");
const roomMessage_entity_1 = require("./roomMessage.entity");
const user_entity_1 = require("./user.entity");
let chatRoom = class chatRoom extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        comment: 'the quiz unique indentifier',
    }),
    __metadata("design:type", Number)
], chatRoom.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], chatRoom.prototype, "RoomOwner", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], chatRoom.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "public" }),
    __metadata("design:type", String)
], chatRoom.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], chatRoom.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => roomMessage_entity_1.roomMessage, (message) => message.id),
    __metadata("design:type", Array)
], chatRoom.prototype, "messageId", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, (user) => user.userName),
    (0, typeorm_1.JoinTable)({ name: 'chatIntUser' }),
    __metadata("design:type", Array)
], chatRoom.prototype, "members", void 0);
chatRoom = __decorate([
    (0, typeorm_1.Entity)('chat')
], chatRoom);
exports.chatRoom = chatRoom;
//# sourceMappingURL=chatRoom.entity.js.map