import { Response } from 'express';
import { UserService } from 'src/user/user.service';
export declare class TwoFactorAuthenticationService {
    private readonly usersService;
    constructor(usersService: UserService);
    generateTwoFactorAuthenticationSecret(user: any): Promise<{
        secret: string;
        otpauthUrl: string;
    }>;
    isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode: string, email: string): Promise<boolean>;
    pipeQrCodeStream(stream: Response, otpauthUrl: string): Promise<any>;
}
