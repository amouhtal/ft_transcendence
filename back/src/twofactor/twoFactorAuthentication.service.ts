import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';

import { toFileStream } from 'qrcode';
import { Response } from 'express';
import { User } from '../entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TwoFactorAuthenticationService {
  constructor (
    private readonly usersService: UserService
  ) {}
 
  public async generateTwoFactorAuthenticationSecret(user: any) {
    const secret = await authenticator.generateSecret();
    
    const app_name = process.env.TWO_FACTOR_AUTHENTICATION_APP_NAME;
    // console.log("oursec", user.userId, app_name, secret);
    const otpauthUrl =  authenticator.keyuri(user.userId, app_name, secret);
    // console.log(otpauthUrl);
    
    await this.usersService.setTwoFactorAuthenticationSecret(secret, user.userId);
 
    return {
      secret,
      otpauthUrl
    }
  }

 public async isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode: string,  email : string)  {

  const user = await this.usersService.findByemail(email);
   const verf : boolean =  authenticator.verify({
      token: twoFactorAuthenticationCode,
      secret: user.twoFactorAuthenticationSecret
    })
    
    return verf;
  }
  
  async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
    
    return toFileStream(stream, otpauthUrl);
  }
}