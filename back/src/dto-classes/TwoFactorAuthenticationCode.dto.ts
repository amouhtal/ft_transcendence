import { IsAlpha } from "class-validator";

export class TwoFactorAuthenticationCodeDto {

    twoFactorAuthenticationCode: string;
    Email : string
}