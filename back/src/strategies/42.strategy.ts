import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-42';
import { config } from 'dotenv';
import { Injectable } from '@nestjs/common';

config();
@Injectable()
export class FtAuthStrategy extends PassportStrategy(Strategy, '42') {
  constructor() {
    super({
      clientID: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      callbackURL: 'http://localhost:3001/auth/42/callback',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const user = {
      email: profile._json.email,
      firstName: profile._json.first_name,
      lastName: profile._json.last_name,
      picture: profile._json.image_url,
      accessToken,
    };
    
    done(null, user);
  }
}
