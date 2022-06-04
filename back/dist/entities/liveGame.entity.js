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
Object.defineProperty(exports, "__esModule", { value: true });
exports.liveGame = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let liveGame = class liveGame {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], liveGame.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], liveGame.prototype, "player1", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], liveGame.prototype, "player2", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], liveGame.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, (user) => user.id),
    __metadata("design:type", Array)
], liveGame.prototype, "watchers", void 0);
liveGame = __decorate([
    (0, typeorm_1.Entity)('liveGame')
], liveGame);
exports.liveGame = liveGame;
//# sourceMappingURL=liveGame.entity.js.map