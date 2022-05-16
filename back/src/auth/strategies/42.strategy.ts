import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-42';
import { config } from 'dotenv';
import {  Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { RefreshToken } from '../entities/refresh-token.entity';

export interface UserDetails {
  username: string;
  photos: string;
}

config();
@Injectable()
export class FtStrategy extends PassportStrategy(Strategy, '42') {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private tokenRepository: Repository<RefreshToken>,
  ) {
    super({
      clientID: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      callbackURL: 'http://10.12.11.1:3000/auth/42/callback',
      profileFields: {
        id: function (obj) {
          return String(obj.id);
        },
        username: 'login',
        displayName: 'displayname',
        'name.familyName': 'last_name',
        'name.givenName': 'first_name',
        profileUrl: 'url',
        'emails.0.value': 'email',
        'phoneNumbers.0.value': 'phone',
        'photos.0.value': 'image_url',
      },
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const { username, photos } = profile;
    const details: UserDetails = { username, photos };
    const user = await this.authService.validateUser(details);
    if (!user) {
      throw new UnauthorizedException();
    }
    console.log("user :,",user)
    return user;
  }
}