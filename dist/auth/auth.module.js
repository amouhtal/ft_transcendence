"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entities/user.entity");
const user_module_1 = require("../user/user.module");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const refresh_token_entity_1 = require("./entities/refresh-token.entity");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const twoFactorAuthentication_controller_1 = require("./twofactor/authentication/twoFactorAuthentication.controller");
const twoFactorAuthentication_service_1 = require("./twofactor/authentication/twoFactorAuthentication.service");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule, typeorm_1.TypeOrmModule.forFeature([refresh_token_entity_1.RefreshToken]),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
        ],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, twoFactorAuthentication_service_1.TwoFactorAuthenticationService],
        controllers: [auth_controller_1.AuthController, twoFactorAuthentication_controller_1.TwoFactorAuthenticationController]
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map