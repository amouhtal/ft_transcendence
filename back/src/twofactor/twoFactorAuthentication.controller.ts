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
  ExecutionContext,
} from '@nestjs/common';
import { TwoFactorAuthenticationService } from './twoFactorAuthentication.service';
import { response, Response } from 'express';

import RequestWithUser from './requestWithUser.interface';
import { JwtAuthGuard } from '../guards/jwt-auth.gguard';
import { UserService } from 'src/user/user.service';
import { TwoFactorAuthenticationCodeDto } from 'src/dto-classes/TwoFactorAuthenticationCode.dto';
import { AuthService } from 'src/auth/auth.service';
import { UserDto } from 'src/dto-classes/user.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('2fa')
@UseInterceptors(ClassSerializerInterceptor)
export class TwoFactorAuthenticationController {
  constructor(
    private readonly twoFactorAuthenticationService: TwoFactorAuthenticationService,
    private readonly usersService: UserService,
    private readonly authenticationService: AuthService,
  ) {}

  @Post('turn-on')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async turnOnTwoFactorAuthentication(
    @Req() request: RequestWithUser,
    @Body() { twoFactorAuthenticationCode }: TwoFactorAuthenticationCodeDto,
  ) {
    let userD: any = request.user;
    let email: string = userD.userId;
    const user = await this.usersService.findByemail(email);
    const isCodeValid =
      await this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
        twoFactorAuthenticationCode,
        email,
      );

    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }

    await this.usersService.turnOnTwoFactorAuthentication(email);

    const accessTokenCookie =
      this.authenticationService.newRefreshAndAccessToken(email, true, {
        ipAddress: 'ip',
      });

    return accessTokenCookie;
  }

  @Post('generate')
  @UseGuards(JwtAuthGuard)
  async register(@Res() response: Response, @Req() request: RequestWithUser) {
    const { otpauthUrl } =
      await this.twoFactorAuthenticationService.generateTwoFactorAuthenticationSecret(
        request.user,
      );
    return this.twoFactorAuthenticationService.pipeQrCodeStream(
      response,
      otpauthUrl,
    );
  }

  @Post('authenticate')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async authenticate(
    @Req() request: RequestWithUser,
    @Body() { twoFactorAuthenticationCode }: TwoFactorAuthenticationCodeDto,
    @Body() data,
    context: ExecutionContext,
  ) {
    let email = data.userId.email;
    let isCodeValid = false;
    isCodeValid =
      await this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
        twoFactorAuthenticationCode,
        email,
      );
    // const isCodeValid = await this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
    //   "668004", "LVMFG5YHOFTHAPBT"
    //   );
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }
    const accessTokenCookie =
      this.authenticationService.newRefreshAndAccessToken(email, true, {
        ipAddress: 'ip',
      });
    console.log(accessTokenCookie);
    // response.cookie('token', accessTokenCookie);
    // request.res.setHeader('Set-Cookie', [accessTokenCookie]);
    return accessTokenCookie;
  }
}
