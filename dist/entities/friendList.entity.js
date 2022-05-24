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
exports.FriendBlocked = exports.FriendLsit = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let FriendLsit = class FriendLsit {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FriendLsit.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FriendLsit.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.friends),
    __metadata("design:type", Number)
], FriendLsit.prototype, "user", void 0);
FriendLsit = __decorate([
    (0, typeorm_1.Entity)('FriendLsit')
], FriendLsit);
exports.FriendLsit = FriendLsit;
let FriendBlocked = class FriendBlocked {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FriendBlocked.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FriendBlocked.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.friendsBlocked),
    __metadata("design:type", Number)
], FriendBlocked.prototype, "user", void 0);
FriendBlocked = __decorate([
    (0, typeorm_1.Entity)('FriendBlocked')
], FriendBlocked);
exports.FriendBlocked = FriendBlocked;
//# sourceMappingURL=friendList.entity.js.map