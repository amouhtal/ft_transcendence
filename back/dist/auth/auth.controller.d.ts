import { Response } from 'express';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import RefreshTokenDto from './dto/refresh-token.dto';
export declare class AuthController {
    private readonly authService;
    private usersRepository;
    constructor(authService: AuthService, usersRepository: Repository<User>);
    auth42(): Promise<void>;
    asyncgoogleAuthRedirect(req: any, response: Response, ip: any): Promise<void>;
    refreshToken(body: RefreshTokenDto): Promise<string>;
    logout(req: any, body: RefreshTokenDto): Promise<void>;
}
