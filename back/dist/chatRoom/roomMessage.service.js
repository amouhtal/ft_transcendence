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
exports.roomMessageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("../entities/user.entity");
const roomMessage_entity_1 = require("../entities/roomMessage.entity");
let roomMessageService = class roomMessageService {
    constructor(RoomRepository, usersRepository, jwtService) {
        this.RoomRepository = RoomRepository;
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    async creatRoomMessage(token, body) {
        const tokenInfo = this.jwtService.decode(token);
        let user_info = await this.usersRepository.query(`select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`);
        var ow;
        if (Object.keys(user_info).length != 0) {
        }
    }
    async getRoomMessages(roomId) {
        console.log("here");
        let messages = await this.RoomRepository.find({ roomId: roomId });
        return messages;
    }
};
roomMessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(roomMessage_entity_1.roomMessage)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], roomMessageService);
exports.roomMessageService = roomMessageService;
//# sourceMappingURL=roomMessage.service.js.map