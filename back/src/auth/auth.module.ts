import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { RefreshToken } from "./entities/refresh-token.entity";
import { JwtStrategy } from './strategies/jwt.strategy';
import { TwoFactorAuthenticationController } from "./twofactor/authentication/twoFactorAuthentication.controller";
import { TwoFactorAuthenticationService } from "./twofactor/authentication/twoFactorAuthentication.service";


@Module({
    imports: [UserModule,TypeOrmModule.forFeature([RefreshToken]),
    TypeOrmModule.forFeature([User]),
    ],
    
    providers: [AuthService, JwtStrategy, TwoFactorAuthenticationService],
    controllers: [AuthController, TwoFactorAuthenticationController]
})

export class AuthModule {}
