import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from "express";
import { JwtAuthGuard } from './guards/jwt-auth.gguard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // @UseGuards(JwtAuthGuard)  
  // getHello(@Res({ passthrough: true }) response: Response) {
  //   // response.send('Hello world');
  //   return "hello world"
  //   // this.appService.getHello();
  // }
}


