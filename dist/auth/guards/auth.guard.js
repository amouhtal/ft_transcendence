"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = require("jsonwebtoken");
let AuthGuard = class AuthGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        let token = request.headers.authorization.split(" ")[1];
        let decoded;
        try {
            decoded = (0, jsonwebtoken_1.verify)(token, process.env.REFRESH_SECRET);
        }
        catch (_a) {
            throw new common_1.UnauthorizedException("Unauthorized");
        }
        request.body['userId'] = decoded;
        request.header['Email'] = decoded;
        return true;
    }
};
AuthGuard = __decorate([
    (0, common_1.Injectable)()
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map