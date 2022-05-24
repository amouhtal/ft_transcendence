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
exports.JwtStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const passport_jwt_1 = require("passport-jwt");
const typeorm_2 = require("typeorm");
const refresh_token_entity_1 = require("../entities/refresh-token.entity");
const user_entity_1 = require("../../entities/user.entity");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    constructor(tokenRepository, userRepository) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.ACCESS_SECRET,
        });
        this.tokenRepository = tokenRepository;
        this.userRepository = userRepository;
    }
    async validate(payload) {
        let token = await this.tokenRepository.findOne({ email: payload.userId });
        if (token) {
            let user = await this.userRepository.findOne({ email: payload.userId });
            if (!user.isTwoFactorAuthenticationEnabled)
                return { userId: payload.userId };
            if (payload.isSecondFacotrAuthenticated)
                return { userId: payload.userId };
        }
    }
};
JwtStrategy = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(refresh_token_entity_1.RefreshToken)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map