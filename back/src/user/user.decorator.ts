import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JWTUtil {
    constructor(private readonly jwtService: JwtService) {}

    decode(auth: string): {uuid: string}{
        const jwt = auth.replace('Bearer ', '');
        return this.jwtService.decode(jwt, { json: true }) as { uuid: string };
    }
}