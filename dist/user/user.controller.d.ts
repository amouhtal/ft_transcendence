import { UserDto } from 'src/dto-classes/user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
export declare class ExampleDto {
    userName: string;
    imageName: string;
}
export declare class UserController {
    private readonly userService;
    private usersRepository;
    private readonly jwtService;
    constructor(userService: UserService, usersRepository: Repository<User>, jwtService: JwtService);
    findAllUsers(): Promise<any>;
    userProfile(request1: Request): Promise<{
        userInfo: any;
        gameHistory: any[];
    }>;
    userUser(userData: UserDto): void;
    chekUsername(request1: Request, request: ExampleDto): Promise<{
        message: string;
    }>;
    getUsername(request1: Request): Promise<{
        exist: boolean;
    }>;
}
