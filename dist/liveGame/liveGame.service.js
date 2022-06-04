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
exports.liveGameService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const liveGame_entity_1 = require("../entities/liveGame.entity");
const typeorm_2 = require("typeorm");
let liveGameService = class liveGameService {
    constructor(liveGameRepository) {
        this.liveGameRepository = liveGameRepository;
    }
    async saveGame(game) {
        this.liveGameRepository.save(game);
    }
    async getGame(player) {
        let liveGame = await this.liveGameRepository.query(`SELECT * FROM public."liveGame" WHERE player1 = '${player}' or player2 = '${player}'`);
        return liveGame;
    }
    async getGameByPlayer(player) {
        let userName = await this.liveGameRepository.query(`SELECT  player1, player2 FROM public."liveGame" WHERE player1 = '${player}' or player2 = '${player}'`);
        var player2;
        if (Object.keys(userName).length !== 0) {
            player2 = userName[0].player1 === player ? userName[0].player2 : userName[0].player1;
        }
        return player2;
    }
    async deleteGame(player) {
        await this.liveGameRepository.query(`DELETE FROM public."liveGame" WHERE public."liveGame"."player1" = '${player}' or public."liveGame"."player2" = '${player}'`);
    }
};
liveGameService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(liveGame_entity_1.liveGame)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], liveGameService);
exports.liveGameService = liveGameService;
//# sourceMappingURL=liveGame.service.js.map