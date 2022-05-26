import { IsAlpha, isBoolean, IsEmail, IsNotEmpty, isString, Length, Max, Min } from "class-validator";
// import { User } from "src/entities/user.entity";
import { User } from "../entities/user.entity";

export class UserDto extends User{

    @IsAlpha()
    firstName: string;

    @IsAlpha()  
    lastName: string;
    
    @Length(4, 10)
    userName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    picture : string
    
    isActive: boolean;
  }

  /*
  email: 'amouhtal@student.1337.ma',
  firstName: 'Abderrahmane',
  lastName: 'Mouhtal',
  picture: 'https://cdn.intra.42.fr/users/amouhtal.jpg',
  accessToken: '84e111be351ec3e5924e4739a9a955b8892e0ed00a85410c769d400a0cf6819c'
  */