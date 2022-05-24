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
exports.UserController = exports.ExampleDto = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_dto_1 = require("../dto-classes/user.dto");
const user_entity_1 = require("../entities/user.entity");
const typeorm_2 = require("typeorm");
const user_service_1 = require("./user.service");
const jwt_1 = require("@nestjs/jwt");
const class_validator_1 = require("class-validator");
const jwt_auth_gguard_1 = require("../auth/guards/jwt-auth.gguard");
class ExampleDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(6, 9),
    __metadata("design:type", String)
], ExampleDto.prototype, "userName", void 0);
exports.ExampleDto = ExampleDto;
let UserController = class UserController {
    constructor(userService, usersRepository, jwtService) {
        this.userService = userService;
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    findAllUsers() {
        return this.userService.findAll();
    }
    async userProfile(request1) {
        const jwt = request1.headers.authorization.replace('Bearer ', '');
        const tokenInfo = this.jwtService.decode(jwt);
        const userInfo = await this.usersRepository.query(`select "userName", "picture" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`);
        let winMatch = await this.usersRepository.query(`SELECT COUNT(winner_user) FROM public."Games" WHERE "winner_user"= '${userInfo[0].userName}'`);
        console.log(winMatch[0].count);
        let loserMatch = await this.usersRepository.query(`SELECT COUNT(loser_user) FROM public."Games" WHERE "loser_user"= '${userInfo[0].userName}'`);
        userInfo[0].country = 'Morocco';
        userInfo[0].winMatch = winMatch[0].count;
        userInfo[0].loserMatch = loserMatch[0].count;
        const gameHistory = await this.usersRepository.query(`select *  from public."Games" WHERE public."Games".winner_user = '${userInfo[0].userName}' OR public."Games".loser_user = '${userInfo[0].userName}'`);
        console.log(gameHistory[0]);
        if (gameHistory[0] !== undefined)
            delete gameHistory[0].id;
        var result = [];
        for (const element of gameHistory) {
            const win_pic = await this.usersRepository.query(`select picture  from public."Users" WHERE public."Users"."userName" = '${element.winner_user}'`);
            const lose_pic = await this.usersRepository.query(`select picture  from public."Users" WHERE public."Users"."userName" = '${element.loser_user}'`);
            result.push({
                winner: {
                    userName: element.winner_user,
                    score: element.Score.split('-')[0],
                    picture: win_pic[0].picture,
                },
                loser: {
                    userName: element.loser_user,
                    score: element.Score.split('-')[1],
                    picture: lose_pic[0].picture,
                },
                played_at: gameHistory[0].played_at,
            });
        }
        const profileInfo = {
            userInfo: userInfo[0],
            gameHistory: result,
        };
        return profileInfo;
    }
    userUser(userData) {
        this.userService.InsertUser(userData);
    }
    async chekUsername(request1, request) {
        let re;
        const jwt = request1.headers.authorization.replace('Bearer ', '');
        const tokenInfo = this.jwtService.decode(jwt);
        let ret = {
            message: 'invalid username',
        };
        const userff = await this.usersRepository.query(`select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`);
        if (userff[0].userName == null) {
            re = await this.userService.findUser(request, tokenInfo.userId);
            if (re) {
                ret.message = 'valid username';
                return ret;
            }
        }
        else {
            ret.message = 'Already have a username';
            return ret;
        }
        console.log(re);
        return ret;
    }
    async getUsername(request1) {
        let re;
        const jwt = request1.headers.authorization.replace('Bearer ', '');
        const tokenInfo = this.jwtService.decode(jwt);
        const userff = await this.usersRepository.query(`select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`);
        console.log(userff);
        if (userff[0].userName != null)
            return { exist: true };
        return { exist: false };
    }
};
__decorate([
    (0, common_1.Get)('users'),
    (0, common_1.UseGuards)(jwt_auth_gguard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAllUsers", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)(jwt_auth_gguard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "userProfile", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "userUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_gguard_1.JwtAuthGuard),
    (0, common_1.Post)('complet'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ExampleDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "chekUsername", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_gguard_1.JwtAuthGuard),
    (0, common_1.Get)('CheckUserName'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsername", null);
UserController = __decorate([
    (0, common_1.Controller)('users'),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        typeorm_2.Repository,
        jwt_1.JwtService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map