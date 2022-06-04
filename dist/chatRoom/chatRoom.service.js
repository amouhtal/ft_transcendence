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
exports.chatRoomService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const chatRoom_entity_1 = require("../entities/chatRoom.entity");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("../entities/user.entity");
let chatRoomService = class chatRoomService {
    constructor(RoomRepository, usersRepository, jwtService) {
        this.RoomRepository = RoomRepository;
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    async createRoom(token, body) {
        const tokenInfo = this.jwtService.decode(token);
        let user_info = await this.usersRepository.query(`select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`);
        var ow;
        if (Object.keys(user_info).length != 0) {
            let userName = user_info[0].userName;
            let user = await this.usersRepository.findOne({ userName: userName });
            let room = await this.RoomRepository.create({ RoomOwner: userName });
            room.members = [user];
            room.name = body.name;
            if (body.type == "private") {
                room.type = "private";
                room.password = body.password;
            }
            console.log(user_info);
            await room.save();
        }
    }
    async getRoomById(gameId) {
        console.log("here");
        let game = await this.RoomRepository.findOne({ id: gameId });
        return game;
    }
};
chatRoomService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(chatRoom_entity_1.chatRoom)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], chatRoomService);
exports.chatRoomService = chatRoomService;
//# sourceMappingURL=chatRoom.service.js.map