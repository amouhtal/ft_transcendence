import { User } from "../entities/user.entity";
export declare class UserDto extends User {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    picture: string;
    isActive: boolean;
}
