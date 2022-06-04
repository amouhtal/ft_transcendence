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
exports.chatRoomController = exports.gID = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_auth_gguard_1 = require("../auth/guards/jwt-auth.gguard");
const chatRoom_service_1 = require("./chatRoom.service");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("../entities/user.entity");
const typeorm_2 = require("typeorm");
const chatRoom_entity_1 = require("../entities/chatRoom.entity");
class gID {
}
exports.gID = gID;
let chatRoomController = class chatRoomController {
    constructor(RoomService, roomRep, usersRepository, jwtService) {
        this.RoomService = RoomService;
        this.roomRep = roomRep;
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    async createRoom(body, request) {
        console.log("here");
        const jwt = request.headers.authorization.replace('Bearer ', '');
        this.RoomService.createRoom(jwt, body);
    }
    async addUser(gameId, request) {
        console.log("here");
        const jwt = request.headers.authorization.replace('Bearer ', '');
        const tokenInfo = this.jwtService.decode(jwt);
        let user = await this.usersRepository.createQueryBuilder('Users').where('Users.email = :email', { email: tokenInfo.userId }).getOne();
        const chat = await this.roomRep
            .createQueryBuilder("chat")
            .leftJoinAndSelect("chat.members", "Users").where('chat.id = :id', { id: gameId.gameId })
            .getMany();
        chat[0].members = [...chat[0].members, user];
        chat[0].save();
    }
};
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseGuards)(jwt_auth_gguard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], chatRoomController.prototype, "createRoom", null);
__decorate([
    (0, common_1.Post)('addUser'),
    (0, common_1.UseGuards)(jwt_auth_gguard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], chatRoomController.prototype, "addUser", null);
chatRoomController = __decorate([
    (0, common_1.Controller)('chatRoom'),
    __param(1, (0, typeorm_1.InjectRepository)(chatRoom_entity_1.chatRoom)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [chatRoom_service_1.chatRoomService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], chatRoomController);
exports.chatRoomController = chatRoomController;
//# sourceMappingURL=chatRoom.controller.js.map