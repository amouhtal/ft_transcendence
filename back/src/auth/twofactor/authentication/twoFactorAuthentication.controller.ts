import {
    ClassSerializerInterceptor,
    Controller,
    Header,
    Post,
    UseInterceptors,
    Res,
    UseGuards,
    Req,
    HttpCode,
    Body,
    UnauthorizedException,
  } from '@nestjs/common';
  import { TwoFactorAuthenticationService } from './twoFactorAuthentication.service';
  import { Response } from 'express';


    import RequestWithUser from '../requestWithUser.interface';
    import { JwtAuthGuard } from '../../guards/jwt-auth.gguard';
import { UserService } from 'src/user/user.service';
import { TwoFactorAuthenticationCodeDto } from 'src/dto-classes/TwoFactorAuthenticationCode.dto';
import { AuthService } from 'src/auth/auth.service';

    @Controller('2fa')
    @UseInterceptors(ClassSerializerInterceptor)
    export class TwoFactorAuthenticationController {
    constructor(
      private readonly twoFactorAuthenticationService: TwoFactorAuthenticationService,
      private readonly usersService: UserService,
      private readonly authenticationService: AuthService
    ) {}

  @Post('turn-on')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async turnOnTwoFactorAuthentication(
    @Req() request: RequestWithUser,
    @Body() { twoFactorAuthenticationCode } : TwoFactorAuthenticationCodeDto
  ) {
    const isCodeValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
      twoFactorAuthenticationCode, request.user
    );
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }
    await this.usersService.turnOnTwoFactorAuthentication(request.user.email);
  }

  @Post('generate')
  @UseGuards(JwtAuthGuard)
  async register(@Res() response: Response, @Req() request: RequestWithUser)
  {
    console.log(request)
    const { otpauthUrl } = await this.twoFactorAuthenticationService.generateTwoFactorAuthenticationSecret(request.user);

    return this.twoFactorAuthenticationService.pipeQrCodeStream(response, otpauthUrl);
  }


  @Post('authenticate')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async authenticate(
    @Req() request: RequestWithUser,
    @Body() { twoFactorAuthenticationCode } : TwoFactorAuthenticationCodeDto
  ) {
    const isCodeValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
      twoFactorAuthenticationCode, request.user
    );
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }
 
    const accessTokenCookie = this.authenticationService.getCookieWithJwtAccessToken(request.user.id, true);
 
    request.res.setHeader('Set-Cookie', [accessTokenCookie]);
 
    return request.user;
  }
}