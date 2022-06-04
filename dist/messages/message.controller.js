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
exports.messageController = exports.uDto = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_auth_gguard_1 = require("../auth/guards/jwt-auth.gguard");
const message_dtp_1 = require("../dto-classes/message.dtp");
const message_service_1 = require("./message.service");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const jwt_1 = require("@nestjs/jwt");
class uDto {
}
exports.uDto = uDto;
let messageController = class messageController {
    constructor(messageServ, usersRepository, jwtService) {
        this.messageServ = messageServ;
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    async saveMessage(message) {
        return await this.messageServ.createMessage(message);
    }
    async getAllMessagesById(token, request) {
        const jwt = request.headers.authorization.replace('Bearer ', '');
        const tokenInfo = this.jwtService.decode(jwt);
        let user = await this.usersRepository.query(`select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`);
        let Name = user[0].userName;
        return await this.messageServ.getConntact(Name);
    }
    async getConv(reciver, request) {
        const jwt = request.headers.authorization.replace('Bearer ', '');
        const tokenInfo = this.jwtService.decode(jwt);
        let user = await this.usersRepository.query(`select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`);
        let Name = user[0].userName;
        let conv = await this.messageServ.getConversation(Name, reciver.userName);
        return conv;
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
    (0, common_1.Get)('getConntacts'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.UseGuards)(jwt_auth_gguard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], messageController.prototype, "getAllMessagesById", null);
__decorate([
    (0, common_1.Post)('getConnversation'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.UseGuards)(jwt_auth_gguard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [uDto, Object]),
    __metadata("design:returntype", Promise)
], messageController.prototype, "getConv", null);
messageController = __decorate([
    (0, common_1.Controller)('message'),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [message_service_1.messageService,
        typeorm_2.Repository,
        jwt_1.JwtService])
], messageController);
exports.messageController = messageController;
//# sourceMappingURL=message.controller.js.map