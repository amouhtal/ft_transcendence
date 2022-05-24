import { Injectable, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from "express";

@Injectable()
export class AppService {
  
  getHello() {

    // return 'Hello World!';
  }
}
