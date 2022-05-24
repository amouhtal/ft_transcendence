import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { RefreshToken } from '../entities/refresh-token.entity';
export interface UserDetails {
    username: string;
    photos: string;
}
declare const FtStrategy_base: new (...args: any[]) => any;
export declare class FtStrategy extends FtStrategy_base {
    private usersRepository;
    private tokenRepository;
    constructor(usersRepository: Repository<User>, tokenRepository: Repository<RefreshToken>);
    validate(accessToken: string, refreshToken: string, profile: any): Promise<any>;
}
export {};
