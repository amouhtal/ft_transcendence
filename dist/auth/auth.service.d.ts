import { VerifyCallback } from 'passport-42';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { RefreshToken } from './entities/refresh-token.entity';
declare const AuthService_base: new (...args: any[]) => any;
export declare class AuthService extends AuthService_base {
    private usersRepository;
    private tokenRepository;
    constructor(usersRepository: Repository<User>, tokenRepository: Repository<RefreshToken>);
    validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any>;
    private retrieveRefreshToken;
    newRefreshAndAccessToken(email: string, isSecondFacotrAuthenticated: boolean, values: {
        ipAddress: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refresh(refreshStr: string): Promise<string | undefined>;
    logout(refreshStr: any): Promise<void>;
    cheskUser(req: any): Promise<0 | 1 | 2>;
    Login(req: any, res: any, values: {
        ipAddress: string;
    }): Promise<"No user from intra" | {
        refAcc: {
            accessToken: string;
            refreshToken: string;
        };
        UserEmail: string;
    }>;
}
export {};
