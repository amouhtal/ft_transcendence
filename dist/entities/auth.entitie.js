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
exports.RefreshToken2 = void 0;
const typeorm_1 = require("typeorm");
const jsonwebtoken_1 = require("jsonwebtoken");
let RefreshToken2 = class RefreshToken2 {
    constructor(init) {
        Object.assign(this, init);
    }
    sign() {
        return (0, jsonwebtoken_1.sign)(Object.assign({}, this), process.env.REFRESH_SECRET);
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RefreshToken2.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], RefreshToken2.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RefreshToken2.prototype, "userAgent", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RefreshToken2.prototype, "ipAddress", void 0);
RefreshToken2 = __decorate([
    (0, typeorm_1.Entity)('RefreshToken'),
    __metadata("design:paramtypes", [Object])
], RefreshToken2);
exports.RefreshToken2 = RefreshToken2;
//# sourceMappingURL=auth.entitie.js.map