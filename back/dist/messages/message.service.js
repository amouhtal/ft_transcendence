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
exports.messageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const message_repository_1 = require("./message.repository");
let messageService = class messageService {
    constructor(messageRep) {
        this.messageRep = messageRep;
    }
    async getMessageById(username) {
        return await this.messageRep.findOne({ id: username });
    }
    async createMessage(message) {
        return await this.messageRep.save(message);
    }
    async getConversation(SId, RId) {
        var get = await this.messageRep.query(`SELECT id, "senderId", "reciverId" , "time", message FROM public.messages WHERE "senderId" = '${SId}' and "reciverId" = '${RId}' or "senderId" = '${RId}' and "reciverId" = '${SId}' ORDER by time`);
        return (get);
    }
    async getConntact(user) {
        var name = await this.messageRep.query(`SELECT "userName"  , "picture" , "isActive" from public."Users" Where "userName" IN
        (select "reciverId"
            FROM public."messages" WHERE "senderId" = '${user}') 
         OR "userName" IN (select "senderId"
            FROM public."messages" WHERE "reciverId" = '${user}')`);
        return name;
    }
};
messageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_repository_1.messageRepository)),
    __metadata("design:paramtypes", [message_repository_1.messageRepository])
], messageService);
exports.messageService = messageService;
//# sourceMappingURL=message.service.js.map