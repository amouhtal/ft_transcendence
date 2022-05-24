import { ArgumentsHost, WsExceptionFilter } from '@nestjs/common';
export declare class BaseWsExceptionFilter<TError = any> implements WsExceptionFilter<TError> {
    private static readonly logger;
    catch(exception: TError, host: ArgumentsHost): void;
    handleError<TClient extends {
        emit: Function;
    }>(client: TClient, exception: TError): void;
    handleUnknownError<TClient extends {
        emit: Function;
    }>(exception: TError, client: TClient): void;
    isExceptionObject(err: any): err is Error;
}
