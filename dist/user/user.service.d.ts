import { UserDto } from "src/dto-classes/user.dto";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { ExampleDto } from "./user.controller";
export declare class UserService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    setTwoFactorAuthenticationSecret(secret: string, email: string): Promise<import("typeorm").UpdateResult>;
    turnOnTwoFactorAuthentication(email: string): Promise<void>;
    InsertUser(userDto: UserDto): Promise<string>;
    findAll(): Promise<any>;
    findUser(request: ExampleDto, email: string): Promise<boolean>;
    findByemail(email: string): Promise<User>;
    updateActive(stats: Boolean, userName: string): Promise<void>;
}
