import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError } from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt')
{

  handleRequest(err: any, user: any, info: any, context: any, status: any)
  { 
    
    // if (err)
      // console.log("error from handlereq");
    if (info instanceof JsonWebTokenError) {
      console.log("-----------------------------------------------------------------");

        // if the access token jwt is invalid this is the error we will be returning.
      throw new UnauthorizedException('Invalid JWT');
    }

    return super.handleRequest(err, user, info, context, status);
  }
}