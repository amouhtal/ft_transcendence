import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "src/auth/auth.service";
import { User } from "src/entities/user.entity";
import { UserModule } from "src/user/user.module";

import { RefreshToken } from "../entities/refresh-token.entity";
import { FtAuthStrategy } from "../strategies/42.strategy";
import { TwoFactorAuthenticationController } from "./twoFactorAuthentication.controller";
import { TwoFactorAuthenticationService } from "./twoFactorAuthentication.service";


@Module({
    imports: [UserModule,TypeOrmModule.forFeature([RefreshToken, User]),
    ],
    providers: [AuthService, TwoFactorAuthenticationService, FtAuthStrategy],
    controllers: [ TwoFactorAuthenticationController]
})

export class TwoFaModule {}
