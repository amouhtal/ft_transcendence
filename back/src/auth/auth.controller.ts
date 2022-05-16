import {
  Controller,
  Get,
  HttpStatus,
  Ip,
  Redirect,
  Req,
  Res,
  UseGuards,
  Header,
  Body,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import RefreshTokenDto from './dto/refresh-token.dto';
import { FtStrategy } from './strategies/42.strategy';

@Controller('auth/42')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  @Get()
  @UseGuards(AuthGuard('42'))
  async auth42() {
  }

  @Get('callback')
  @UseGuards(AuthGuard('42'))
  async asyncgoogleAuthRedirect(
    @Req() req,
    @Res() response: Response,
    @Ip() ip,
  ) {
    try {
      let info: any = await this.authService.Login(req, response, {
        ipAddress: ip,
      });
      let isTwoFactorEnabled = await this.usersRepository
        .query(`SELECT "isTwoFactorAuthenticationEnabled" \
      FROM public."Users" WHERE "email" = '${info.email}'; `);
      console.log("aceRefTok", "|",info.refAcc)

      response.cookie('token', info.refAcc);
      if (await this.authService.cheskUser(req))
        response.redirect(
          `http://10.12.10.4:3000/home?token=${info.refAcc.accessToken}&refreshToken=${info.refAcc.refreshToken}`,
        );
      else
        response.redirect(
          `http://10.12.10.4:3000/?token=${info.refAcc.accessToken}&refreshToken=${info.refAcc.refreshToken}`,
        );
    } catch (e) {
      console.log(e);
    }
  }

  @Get('refresh')
  async refreshToken(@Body() body: RefreshTokenDto) {
    return this.authService.refresh(body.refreshToken);
  }

  @Delete('logout')
  async logout(@Body() body: RefreshTokenDto) {
    return this.authService.logout(body.refreshToken);
  }
}
