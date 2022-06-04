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
exports.gamesController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const game_dto_1 = require("../dto-classes/game.dto");
const game_entity_1 = require("../entities/game.entity");
const typeorm_2 = require("typeorm");
const game_service_1 = require("./game.service");
const jwt_auth_gguard_1 = require("../auth/guards/jwt-auth.gguard");
let gamesController = class gamesController {
    constructor(gamesService, gameService) {
        this.gamesService = gamesService;
        this.gameService = gameService;
    }
    finGames(request) {
        return this.gamesService.findAll();
    }
    getGames(gamesData) {
        this.gamesService.InsertGame(gamesData);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_gguard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], gamesController.prototype, "finGames", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_gguard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [game_dto_1.GamesDto]),
    __metadata("design:returntype", void 0)
], gamesController.prototype, "getGames", null);
gamesController = __decorate([
    (0, common_1.Controller)('games'),
    __param(1, (0, typeorm_1.InjectRepository)(game_entity_1.Games)),
    __metadata("design:paramtypes", [game_service_1.GamesService,
        typeorm_2.Repository])
], gamesController);
exports.gamesController = gamesController;
//# sourceMappingURL=game.controller.js.map