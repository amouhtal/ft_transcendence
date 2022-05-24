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
exports.chatGateway = void 0;
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const message_dtp_1 = require("../dto-classes/message.dtp");
const user_entity_1 = require("../entities/user.entity");
const message_service_1 = require("../messages/message.service");
const user_service_1 = require("../user/user.service");
const typeorm_2 = require("typeorm");
var sockets = new Map();
var matchMakingarray = new Array;
let chatGateway = class chatGateway {
    constructor(messageServ, userServ, usersRepository, jwtService) {
        this.messageServ = messageServ;
        this.userServ = userServ;
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
        this.server = [];
    }
    async handleDisconnect(client) {
        let auth_token = client.handshake.auth.Authorization;
        if (auth_token !== "null" && auth_token !== "undefined") {
            const tokenInfo = this.jwtService.decode(auth_token);
            let sender_id = await this.usersRepository.query(`select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`);
            console.log("------ desconnection -----");
            let array = sockets.get(sender_id[0].userName);
            let i = 0;
            if (array != undefined) {
                array.forEach(element => {
                    if (element.id == client.id)
                        array.splice(i, 1);
                    i++;
                });
            }
            if (array == undefined || array.length == 0)
                this.userServ.updateActive(false, sender_id[0].userName);
            if (array != undefined) {
                for (let [key, value] of sockets) {
                    if (key == sender_id[0].userName) {
                        for (let node of value)
                            console.log(node.id);
                    }
                }
            }
            console.log("----------------------");
        }
    }
    async handleConnection(client, ...args) {
        let auth_token = await client.handshake.auth.Authorization;
        if (auth_token !== "null" && auth_token !== "undefined") {
            const tokenInfo = this.jwtService.decode(auth_token);
            let sender_id = await this.usersRepository.query(`select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`);
            console.log("------ connection ...-----");
            if (sockets.get(sender_id[0].userName) != undefined) {
                for (let [key, value] of sockets) {
                    if (key == sender_id[0].userName) {
                        value.push(client);
                        sockets.set(sender_id[0].userName, value);
                        break;
                    }
                }
            }
            else {
                var obj = [];
                obj.push(client);
                sockets.set(sender_id[0].userName, obj);
            }
            for (let [key, value] of sockets) {
                if (key == sender_id[0].userName) {
                    for (let node of value)
                        console.log(node.id);
                }
            }
            this.userServ.updateActive(true, sender_id[0].userName);
            console.log("-----------------------");
        }
    }
    async handleMessage(client, text) {
        console.log("--------messaging-------------");
        let auth_token = client.handshake.auth;
        const tokenInfo = this.jwtService.decode(auth_token.Authorization);
        let sender_id = await this.usersRepository.query(`select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`);
        var data = new message_dtp_1.messageDto();
        data.message = text[0];
        data.senderId = sender_id[0].userName;
        data.reciverId = text[1];
        data.time = new Date();
        console.log(data.time);
        await this.messageServ.createMessage(data);
        var senderMessages = await this.messageServ.getConversation(data.senderId, data.reciverId);
        var reciverMessages = await this.messageServ.getConversation(data.reciverId, data.senderId);
        var conversation = [{ "sender": senderMessages }, { "reciver": reciverMessages }];
        var senderSock = [];
        var reciverSock = [];
        senderSock = sockets.get(data.senderId);
        for (let ids of senderSock) {
            console.log(conversation);
            ids.emit("message", conversation);
        }
        reciverSock = sockets.get(data.reciverId);
        if (reciverSock != undefined) {
            for (let ids of reciverSock) {
                console.log("reciver");
                ids.emit("message", conversation);
            }
        }
        console.log("-------------------------------");
    }
    async matchmaking(client, test) {
        var player = [];
        if (matchMakingarray.indexOf(test[0]) != -1) {
            matchMakingarray.push(test[0]);
        }
        if (matchMakingarray.length > 1) {
            player = sockets.get(test[0]);
            for (let ids of player) {
                if (matchMakingarray[0] == test[0])
                    ids.emit("matchmaking", matchMakingarray[0]);
                else
                    ids.emit("matchmaking", matchMakingarray[1]);
            }
            matchMakingarray.splice(0, 2);
            return "match Found";
        }
        else
            return "still waiting";
    }
    async playing() {
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", Object)
], chatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], chatGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('matchmaking'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], chatGateway.prototype, "matchmaking", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('playing'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], chatGateway.prototype, "playing", null);
chatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [message_service_1.messageService, user_service_1.UserService,
        typeorm_2.Repository,
        jwt_1.JwtService])
], chatGateway);
exports.chatGateway = chatGateway;
//# sourceMappingURL=chat.gateway.js.map