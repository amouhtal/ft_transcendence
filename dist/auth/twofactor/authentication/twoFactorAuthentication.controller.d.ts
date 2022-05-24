import { ExecutionContext } from '@nestjs/common';
import { TwoFactorAuthenticationService } from './twoFactorAuthentication.service';
import { Response } from 'express';
import RequestWithUser from '../requestWithUser.interface';
import { UserService } from 'src/user/user.service';
import { TwoFactorAuthenticationCodeDto } from 'src/dto-classes/TwoFactorAuthenticationCode.dto';
import { AuthService } from 'src/auth/auth.service';
export declare class TwoFactorAuthenticationController {
    private readonly twoFactorAuthenticationService;
    private readonly usersService;
    private readonly authenticationService;
    constructor(twoFactorAuthenticationService: TwoFactorAuthenticationService, usersService: UserService, authenticationService: AuthService);
    turnOnTwoFactorAuthentication(request: RequestWithUser, { twoFactorAuthenticationCode }: TwoFactorAuthenticationCodeDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    register(response: Response, request: RequestWithUser): Promise<any>;
    authenticate(request: RequestWithUser, { twoFactorAuthenticationCode }: TwoFactorAuthenticationCodeDto, data: any, context: ExecutionContext): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
