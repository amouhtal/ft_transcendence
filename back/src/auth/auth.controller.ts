import {
  Controller,
  Get,
  Ip,
  Req,
  Res,
  UseGuards,
  Body,
  Delete,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import RefreshTokenDto from '../dto-classes/refresh-token.dto';
import { Ft42AuthGuard } from './guards/ft42.guard';
import { JwtAuthGuard } from './guards/jwt-auth.gguard';

@Controller('auth/42')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  @Get()
  @UseGuards(Ft42AuthGuard)
  async auth42() {}

  @Get('callback')
  @UseGuards(Ft42AuthGuard)
  async asyncgoogleAuthRedirect(
    @Req() req,
    @Res() response: Response,
    @Ip() ip,
  ) {
    try 
    {
      let info: any = await this.authService.Login(req, response, {
        ipAddress: ip,
      });
      let isTwoFactorEnabled = await this.usersRepository
        .query(`SELECT "isTwoFactorAuthenticationEnabled" \
      FROM public."Users" WHERE "email" = '${info.email}'; `);
      console.log('aceRefTok', '|', info.refAcc);

      response.cookie('token', info.refAcc);

      let ret: number = await this.authService.cheskUser(req);
      if (ip == '::ffff:10.12.10.2') {
        if (ret == 1)
          response.redirect(
            `http://10.12.10.2:3000/authentication?token=${info.refAcc.accessToken}&refreshToken=${info.refAcc.refreshToken}`,
          );
        else if (ret == 2)
          response.redirect(
            `http://10.12.10.2:3000/home?token=${info.refAcc.accessToken}&refreshToken=${info.refAcc.refreshToken}`,
          );
        else response.redirect(`http://10.12.10.2:3000`);
      } 
      else {
        if (ret == 1)
          response.redirect(
            `http://10.12.10.5:3000/authentication?token=${info.refAcc.accessToken}&refreshToken=${info.refAcc.refreshToken}`,
          );
        else if (ret == 2)
          response.redirect(
            `http://10.12.10.5:3000/home?token=${info.refAcc.accessToken}&refreshToken=${info.refAcc.refreshToken}`,
          );
        else response.redirect(`http://10.12.10.5:3000`);
      }
    }
    catch (e)
    {
      console.log(e);
    }
  }

  @Get('refresh')
  @UseGuards(JwtAuthGuard)
  async refreshToken(@Body() body: RefreshTokenDto) {
    return this.authService.refresh(body.refreshToken);
  }

  @Delete('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req, @Body() body: RefreshTokenDto) {
    console.log('ref-->', req.refreshToken);
    return this.authService.logout(body.refreshToken);
  }
}
