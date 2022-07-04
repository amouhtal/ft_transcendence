import { AuthGuard } from '@nestjs/passport';

import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class Ft42AuthGuard extends AuthGuard('42') {

  handleRequest(err: Error, user: any, info: any) {
    console.log(
        "from guard"
    );
    console.log(user);
    console.log("---------------------");
    
    if (
      info &&
      info.message ===
        'The resource owner or authorization server denied the request.'
    )
      return 'failure';
    else if (err || !user) {
      
      throw new UnauthorizedException();
    }
    return user;
  }
}
