export declare class RefreshToken2 {
    constructor(init?: Partial<RefreshToken2>);
    id: number;
    userName: string;
    userAgent: string;
    ipAddress: string;
    sign(): string;
}
