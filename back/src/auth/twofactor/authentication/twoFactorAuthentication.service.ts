import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { User } from 'src/entities/user.entity';

import { toFileStream } from 'qrcode';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TwoFactorAuthenticationService {
  constructor (
    private readonly usersService: UserService
  ) {}
 
  public async generateTwoFactorAuthenticationSecret(user: any) {
    const secret = authenticator.generateSecret();
    console.log(user)
    
    const app_name = process.env.TWO_FACTOR_AUTHENTICATION_APP_NAME;
    const otpauthUrl = authenticator.keyuri(user.userId, app_name, secret);
    
    await this.usersService.setTwoFactorAuthenticationSecret(secret, user.userId);
 
    return {
      secret,
      otpauthUrl
    }
  }

  public isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode: string, user: User) {
    return authenticator.verify({
      token: twoFactorAuthenticationCode,
      secret: user.twoFactorAuthenticationSecret
    })
  }
  
  public async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
    return toFileStream(stream, otpauthUrl);
  }
}