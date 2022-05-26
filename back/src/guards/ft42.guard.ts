import { AuthGuard } from '@nestjs/passport';

import { config } from 'dotenv';
import {  Injectable, UnauthorizedException, } from '@nestjs/common';


@Injectable()
export class Ft42AuthGuard  extends AuthGuard('42') {
  handleRequest(err: Error, user: any, info: any) {
    // You can throw an exception based on either "info" or "err" arguments
    if (
      info
      && info.message ===
        'The resource owner or authorization server denied the request.'
    )
		  return "failure";
    else if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
