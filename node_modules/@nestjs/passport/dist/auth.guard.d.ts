import { CanActivate } from '@nestjs/common';
import { Type } from './interfaces';
import { IAuthModuleOptions } from './interfaces/auth-module.options';
export declare type IAuthGuard = CanActivate & {
    logIn<TRequest extends {
        logIn: Function;
    } = any>(request: TRequest): Promise<void>;
    handleRequest<TUser = any>(err: any, user: any, info: any, context: any, status?: any): TUser;
    getAuthenticateOptions(context: any): IAuthModuleOptions | undefined;
};
export declare const AuthGuard: (type?: string | string[]) => Type<IAuthGuard>;
