import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "src/dto-classes/user.dto";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { UserService } from "./user.service";
import { Request } from 'express';
import { JwtService } from "@nestjs/jwt";
import { IsNotEmpty, IsString, Length } from "class-validator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.gguard";

export class ExampleDto {
    @IsString()
    @IsNotEmpty()
    @Length(6, 9)
    userName: string;

    imageName: string;
}

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private readonly jwtService: JwtService)
    {
    }

    @Get('users')
    @UseGuards(JwtAuthGuard)
    findAllUsers() {
        return this.userService.findAll();
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async userProfile(@Req() request1: Request) {
        const jwt = request1.headers.authorization.replace('Bearer ', '');
        const tokenInfo : any = this.jwtService.decode(jwt);
        
        const userInfo = await this.usersRepository.query(`select "userName", "picture" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`);
        userInfo[0].country = 'Morocco'
        userInfo[0].winMatch = '0'
        userInfo[0].loserMatch = '0'
        const gameHistory = await this.usersRepository.query(`select *  from public."Games" WHERE public."Games".winner_user = '${userInfo[0].userName}' OR public."Games".loser_user = '${userInfo[0].userName}'`);
        
        console.log(gameHistory[0])
        if (gameHistory[0] !== undefined)
        delete gameHistory[0].id;
        
        var result = []
        for(const element of gameHistory) {
            const win_pic = await this.usersRepository.query(`select picture  from public."Users" WHERE public."Users"."userName" = '${element.winner_user}'`);
            const lose_pic = await this.usersRepository.query(`select picture  from public."Users" WHERE public."Users"."userName" = '${element.loser_user}'`);
           result.push({
                winner : {
                    userName:element.winner_user,
                    score:element.Score.split('-')[0],
                    picture: win_pic[0].picture
                },
    
                loser : {
                    userName:element.loser_user,
                    score:element.Score.split('-')[1],
                    picture: lose_pic[0].picture
                },
                played_at : gameHistory[0].played_at
            })
        };
        const profileInfo = {
            userInfo: userInfo[0] ,
            gameHistory: result
        }
        return profileInfo;
    }

    @Post()
    @UsePipes(ValidationPipe)
    userUser(
        @Body() userData:  UserDto
    )
    {
        // console.log(userData);
        this.userService.InsertUser(userData);
    }

    @UseGuards(JwtAuthGuard)
    @Post('complet')
    async chekUsername(@Req() request1: Request, @Body() request: ExampleDto)
    {
        // console.log(request, "\n", request)
        let re : Boolean;
        const jwt = request1.headers.authorization.replace('Bearer ', '');
        const tokenInfo : any = this.jwtService.decode(jwt);;
        let ret = {
            message: 'invalid username'
        }

        const userff = await this.usersRepository.query(`select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`);
        if (userff[0].userName == null)
        {
            
            re  = await this.userService.findUser(request, tokenInfo.userId);
            if (re)
            {
                ret.message = 'valid username';
                return ret;
            }
        }
        else
        {
            ret.message = 'Already have a username';
            return  ret;

        }
        console.log(re);
        return ret;
    }

    @UseGuards(JwtAuthGuard)
    @Get('CheckUserName')
    async getUsername(@Req() request1: Request)
    {
        // console.log(request, "\n", request)
        let re : Boolean;
        const jwt = request1.headers.authorization.replace('Bearer ', '');
        const tokenInfo : any = this.jwtService.decode(jwt);;
      

        const userff = await this.usersRepository.query(`select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`);
        console.log(userff);
        if (userff[0].userName != null)
            return {exist: true};
        return {exist: false};
    }
}
