import { CanActivate, ExecutionContext, Headers, Injectable, UnauthorizedException , Res, Req} from "@nestjs/common";
import { Observable } from "rxjs";
import { verify } from 'jsonwebtoken';
import { Request, response } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
	  context: ExecutionContext,
	  ): boolean | Promise<boolean> | Observable<boolean> {
		  
	const request = context.switchToHttp().getRequest();
	let token : string = request.headers.authorization.split(" ")[1];
	let decoded;

	try {
		decoded = verify(token, process.env.REFRESH_SECRET);
   }
   catch{
	   throw new UnauthorizedException("Unauthorized")
   }
   request.body['userId'] = decoded;
   request.header['Email'] = decoded
//    request.header('Email', 'My email');
//    console.log(request.headers)

   	//   reque.setHeader('Email', 'value')

	return true;
  }

}
