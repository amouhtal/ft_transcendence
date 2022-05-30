import { IsAlpha, IsNotEmpty } from "class-validator";

export class TwoFactorAuthenticationCodeDto {

    @IsNotEmpty()
    twoFactorAuthenticationCode: string;
    @IsNotEmpty()
    Email : string
}