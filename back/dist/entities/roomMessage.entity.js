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
exports.roomMessage = void 0;
const typeorm_1 = require("typeorm");
const chatRoom_entity_1 = require("./chatRoom.entity");
let roomMessage = class roomMessage extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        comment: 'the quiz unique indentifier',
    }),
    __metadata("design:type", Number)
], roomMessage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], roomMessage.prototype, "senderId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], roomMessage.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => chatRoom_entity_1.chatRoom, (chat) => chat.id),
    __metadata("design:type", Number)
], roomMessage.prototype, "roomId", void 0);
roomMessage = __decorate([
    (0, typeorm_1.Entity)('roomMessage')
], roomMessage);
exports.roomMessage = roomMessage;
//# sourceMappingURL=roomMessage.entity.js.map