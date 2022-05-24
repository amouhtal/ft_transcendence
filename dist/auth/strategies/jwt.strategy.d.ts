import { Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { RefreshToken } from '../entities/refresh-token.entity';
import { User } from "../../entities/user.entity";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private tokenRepository;
    private userRepository;
    constructor(tokenRepository: Repository<RefreshToken>, userRepository: Repository<User>);
    validate(payload: any): Promise<{
        userId: any;
    }>;
}
export {};
