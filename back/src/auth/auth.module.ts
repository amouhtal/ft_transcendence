import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { RefreshToken } from "../entities/refresh-token.entity";
import { FtAuthStrategy } from "../strategies/42.strategy";
import { JwtStrategy } from '../strategies/jwt.strategy';
import { TwoFactorAuthenticationController } from "../twofactor/twoFactorAuthentication.controller";
import { TwoFactorAuthenticationService } from "../twofactor/twoFactorAuthentication.service";
import { JwtModule } from "@nestjs/jwt";


@Module({
    imports: [UserModule,TypeOrmModule.forFeature([RefreshToken, User]),
    JwtModule.register({ secret: process.env.ACCESS_SECRET })
    ],
    providers: [AuthService, JwtStrategy, TwoFactorAuthenticationService, FtAuthStrategy],
    controllers: [AuthController]
})

export class AuthModule {}
