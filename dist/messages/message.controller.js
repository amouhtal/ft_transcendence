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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageController = void 0;
const common_1 = require("@nestjs/common");
const message_dtp_1 = require("../dto-classes/message.dtp");
const message_service_1 = require("./message.service");
let messageController = class messageController {
    constructor(messageServ) {
        this.messageServ = messageServ;
    }
    async saveMessage(message) {
        return await this.messageServ.createMessage(message);
    }
    async getAllMessagesById(userId) {
    }
};
__decorate([
    (0, common_1.Post)('add'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_dtp_1.messageDto]),
    __metadata("design:returntype", Promise)
], messageController.prototype, "saveMessage", null);
__decorate([
    (0, common_1.Post)('grapMessages'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], messageController.prototype, "getAllMessagesById", null);
messageController = __decorate([
    (0, common_1.Controller)('message'),
    __metadata("design:paramtypes", [message_service_1.messageService])
], messageController);
exports.messageController = messageController;
//# sourceMappingURL=message.controller.js.map