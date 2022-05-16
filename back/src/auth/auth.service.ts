import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-42';
// import { UserDto } from "src/dto-classes/user.dto";
import { sign, verify } from 'jsonwebtoken';

import { config } from 'dotenv';

import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { UserDto } from 'src/dto-classes/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { RefreshToken } from './entities/refresh-token.entity';
import { response } from 'express';

config();
@Injectable()
export class AuthService extends PassportStrategy(Strategy, '42') {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private tokenRepository: Repository<RefreshToken>,
  ) {
    super({
      clientID: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      callbackURL: 'http://10.12.11.3:3000/auth/42/callback',
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
        campus: 'campus.name'
      },
    })
    {

    };
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;

    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    done(null, user);
  }

  private async retrieveRefreshToken(
    refreshStr: string,
  ): Promise<RefreshToken | undefined> {
    try {
      const decoded = verify(refreshStr, process.env.REFRESH_SECRET);
      console.log(decoded);
      if (typeof decoded === 'string') {
        return undefined;
      }
      // const rr = this.refreshTokens.find((token) => token.id === decoded.id);
      let emaile: string = decoded.email;

      return Promise.resolve(
        // this.refreshTokens.findOne({email}),
        // const user = await this.userRepository.findOne({ where:{ email:'this@mailisnotindatabase.de' }});

        await this.tokenRepository.findOneBy({ email: decoded.email }),
      );
    } catch (e) {
      console.log(e.message);
      return undefined;
    }
  }

  async newRefreshAndAccessToken(
    email: string,
    isSecondFacotrAuthenticated = false,
    values: { ipAddress: string },
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const refreshObject = new RefreshToken();
    refreshObject.email = email;
    refreshObject.ipAddress = values.ipAddress;
    refreshObject.userAgent = 'testtest';
    this.tokenRepository.save(refreshObject);

    return {
      refreshToken: refreshObject.sign(),
      accessToken: sign(
        {
          userId: email,
          isSecondFacotrAuthenticated: isSecondFacotrAuthenticated,
        },
        process.env.ACCESS_SECRET,
        {
          expiresIn: '12d',
        },
      ),
    };
  }

  async refresh(refreshStr: string): Promise<string | undefined> {
    const refreshToken = await this.retrieveRefreshToken(refreshStr);

    if (!refreshToken) {
      return undefined;
    }
    const user = await this.usersRepository.findOneBy({
      email: refreshToken.email,
    });
    console.log('______)', user);
    if (!user) {
      return undefined;
    }

    const accessToken = {
      userId: refreshToken.email,
    };

    return sign(accessToken, process.env.ACCESS_SECRET, { expiresIn: '12d' });
  }

  async logout(refreshStr): Promise<void> {
    const refreshToken = await this.retrieveRefreshToken(refreshStr);
    console.log('------------------');
    console.log(refreshToken);
    if (!refreshToken) return;
    console.log('------------------');

    await this.tokenRepository.query(
      `DELETE FROM public.refresh_token WHERE "email" = '${refreshToken.email}'`,
    );
  }

  async cheskUser(req) {
    let exist = await this.usersRepository.findOne({
      where: {
        email: req.user.email,
      },
    });
    return exist;
  }

  async Login(req, res, values: { ipAddress: string }) {
    if (!req.user) return 'No user from intra';

    // const userId = req.user.email;

    // const payload = { userId: userId };
    // const token = this.jwtService.sign(payload);;
    // const token = this.jwtService.sign(payload);

    // response.cookie('access_token', token, {
    //   httpOnly: true,
    //   domain: 'localhost', // your domain here!
    //   expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    // })
    
    // .send({ success: true });
    console.log("id : ", req.user.campus)
    let userDto = new UserDto();
    userDto.email = req.user.email;
    userDto.firstName = req.user.firstName;
    userDto.lastName = req.user.lastName;
    userDto.picture = req.user.picture;
    userDto.isActive = true;
    let exist;
    if ((exist = await this.cheskUser(req)) == null) {
      userDto.userName = req.user.userName;
      // console.log(userDto);
      // if (!userDto.userName)
      // {
      await this.usersRepository.save(userDto);
      // }
    }
    //  insert into "Users" (id,"firstName","lastName", "userName","email") values (9,'ftest', 'lname', 'username', 'etest');
    // const iser = await this.usersRepository.query(`insert into Users 'winner_user,"loser_user","Score","played_at" from "Games" where winner_user='amouhtal' or loser_user='amouhtal'`);
    // let info = this.newRefreshAndAccessToken(userDto, values)
    // console.log(this.newRefreshAndAccessToken(userDto, values));
    return {
      refAcc: await this.newRefreshAndAccessToken(userDto.email, false, values),
      UserEmail: userDto.email,
    };
  }
}
