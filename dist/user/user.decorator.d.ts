import { JwtService } from "@nestjs/jwt";
export declare class JWTUtil {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    decode(auth: string): {
        uuid: string;
    };
}
