import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { RefreshToken } from '../entities/refresh-token.entity';
import { User } from '../entities/user.entity';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(RefreshToken)
    private tokenRepository: Repository<RefreshToken>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_SECRET,
    });
  }

  async validate(payload) {
    console.log('--------------11----------', payload.userId);

    let token = await this.tokenRepository.findOneBy({ email: payload.userId });
    if (token) {
      let user = await this.userRepository.findOneBy({ email: payload.userId });
      if (user && !user.isTwoFactorAuthenticationEnabled)
        return { userId: payload.userId };
      if (payload.isSecondFacotrAuthenticated)
        return { userId: payload.userId };
    }
    // return {

    //   userId: payload.userId,
    // };
    throw new UnauthorizedException('Invalid JWT');
  }
}
