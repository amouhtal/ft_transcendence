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
exports.FtStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_42_1 = require("passport-42");
const dotenv_1 = require("dotenv");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../entities/user.entity");
const typeorm_2 = require("typeorm");
const refresh_token_entity_1 = require("../entities/refresh-token.entity");
(0, dotenv_1.config)();
let FtStrategy = class FtStrategy extends (0, passport_1.PassportStrategy)(passport_42_1.Strategy, '42') {
    constructor(usersRepository, tokenRepository) {
        super({
            clientID: process.env.CLIENTID,
            clientSecret: process.env.CLIENTSECRET,
            callbackURL: 'http://10.12.11.1:3000/auth/42/callback',
            profileFields: {
                id: function (obj) {
                    return String(obj.id);
                },
                username: 'login',
                displayName: 'displayname',
                'name.familyName': 'last_name',
                'name.givenName': 'first_name',
                profileUrl: 'url',
                'emails.0.value': 'email',
                'phoneNumbers.0.value': 'phone',
                'photos.0.value': 'image_url',
            },
        });
        this.usersRepository = usersRepository;
        this.tokenRepository = tokenRepository;
    }
    async validate(accessToken, refreshToken, profile) {
        const { username, photos } = profile;
        const details = { username, photos };
        const user = await this.authService.validateUser(details);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        console.log("user :,", user);
        return user;
    }
};
FtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(refresh_token_entity_1.RefreshToken)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], FtStrategy);
exports.FtStrategy = FtStrategy;
//# sourceMappingURL=42.strategy.js.map