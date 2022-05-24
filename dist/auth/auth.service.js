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
exports.AuthService = void 0;
const passport_1 = require("@nestjs/passport");
const passport_42_1 = require("passport-42");
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = require("dotenv");
const common_1 = require("@nestjs/common");
const user_dto_1 = require("../dto-classes/user.dto");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entities/user.entity");
const typeorm_2 = require("typeorm");
const refresh_token_entity_1 = require("./entities/refresh-token.entity");
(0, dotenv_1.config)();
let AuthService = class AuthService extends (0, passport_1.PassportStrategy)(passport_42_1.Strategy, '42') {
    constructor(usersRepository, tokenRepository) {
        super({
            clientID: process.env.CLIENTID,
            clientSecret: process.env.CLIENTSECRET,
            callbackURL: 'http://10.12.11.3:3000/auth/42/callback',
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
                campus: 'campus.name',
            },
        });
        this.usersRepository = usersRepository;
        this.tokenRepository = tokenRepository;
        {
        }
    }
    async validate(accessToken, refreshToken, profile, done) {
        const { name, emails, photos } = profile;
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken,
        };
        done(null, user);
    }
    async retrieveRefreshToken(refreshStr) {
        try {
            const decoded = (0, jsonwebtoken_1.verify)(refreshStr, process.env.REFRESH_SECRET);
            console.log(decoded);
            if (typeof decoded === 'string') {
                return undefined;
            }
            let emaile = decoded.email;
            return Promise.resolve(await this.tokenRepository.findOne({ email: decoded.email }));
        }
        catch (e) {
            console.log(e.message);
            return undefined;
        }
    }
    async newRefreshAndAccessToken(email, isSecondFacotrAuthenticated = false, values) {
        const refreshObject = new refresh_token_entity_1.RefreshToken();
        refreshObject.email = email;
        refreshObject.ipAddress = values.ipAddress;
        refreshObject.userAgent = 'testtest';
        this.tokenRepository.save(refreshObject);
        return {
            refreshToken: refreshObject.sign(),
            accessToken: (0, jsonwebtoken_1.sign)({
                userId: email,
                isSecondFacotrAuthenticated: isSecondFacotrAuthenticated,
            }, process.env.ACCESS_SECRET, {
                expiresIn: '12d',
            }),
        };
    }
    async refresh(refreshStr) {
        const refreshToken = await this.retrieveRefreshToken(refreshStr);
        if (!refreshToken) {
            return undefined;
        }
        const user = await this.usersRepository.findOne({
            email: refreshToken.email,
        });
        console.log('______)', user);
        if (!user) {
            return undefined;
        }
        const accessToken = {
            userId: refreshToken.email,
        };
        return (0, jsonwebtoken_1.sign)(accessToken, process.env.ACCESS_SECRET, { expiresIn: '12d' });
    }
    async logout(refreshStr) {
        const refreshToken = await this.retrieveRefreshToken(refreshStr);
        console.log('------------------');
        console.log(refreshToken);
        if (!refreshToken)
            return;
        console.log('------------------');
        await this.tokenRepository.query(`DELETE FROM public.refresh_token WHERE "email" = '${refreshToken.email}'`);
    }
    async cheskUser(req) {
        let exist = await this.usersRepository.findOne({
            where: {
                email: req.user.email,
            },
        });
        if (exist.isTwoFactorAuthenticationEnabled === true)
            return 1;
        console.log(exist.isTwoFactorAuthenticationEnabled);
        if (exist)
            return 2;
        return 0;
    }
    async Login(req, res, values) {
        if (!req.user)
            return 'No user from intra';
        console.log('id : ', req.user.campus);
        let userDto = new user_dto_1.UserDto();
        userDto.email = req.user.email;
        userDto.firstName = req.user.firstName;
        userDto.lastName = req.user.lastName;
        userDto.picture = req.user.picture;
        userDto.isActive = true;
        let exist;
        if ((exist = await this.cheskUser(req)) == null) {
            userDto.userName = req.user.userName;
            await this.usersRepository.save(userDto);
        }
        return {
            refAcc: await this.newRefreshAndAccessToken(userDto.email, false, values),
            UserEmail: userDto.email,
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(refresh_token_entity_1.RefreshToken)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map