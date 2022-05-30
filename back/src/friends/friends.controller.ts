import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendLsit } from 'src/entities/friendList.entity';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { friendsService } from './friends.service';
import { User } from 'src/entities/user.entity';
import { IsNotEmpty, IsString, isString } from 'class-validator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.gguard';
import { AuthGuard } from 'src/guards/auth.guard';
import { request } from 'http';
import { UserService } from 'src/user/user.service';
import { FriendsInviteDto } from 'src/dto-classes/Frinends.dto';

export class frienduser {
  @IsNotEmpty()
  @IsString()
  userName: string;
}

@Controller('friends')
@UseGuards(JwtAuthGuard)
export class FriendsController {
  constructor(
    private readonly friendService: friendsService,
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('all')
  @UseGuards(JwtAuthGuard)
  async findall(@Body() data: FriendsInviteDto, @Req() request: Request) {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const tokenInfo: any = this.jwtService.decode(jwt);
    const user: User = await this.userService.getUserJwt(jwt);
    console.log('--->', user);
    const userName = await this.userRepo.query(
      `select public."Users"."userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`,
    );
    const userId = await this.userRepo.query(
      `select "id" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`,
    );

    console.log('--->', userName);
    //  const userName = await this.userRepo.query(`SELECT "userName", "picture" FROM public."Users";`);
    return await this.friendService.users(userName[0].userName, userId[0].id);
    //     return this.friendService.findAll(userName);
  }

  @Post('one')
  async getOne(@Body() data: frienduser) {
    this.friendService.friendStatus(data.userName);

    const pic = await this.userRepo.query(
      `SELECT COUNT(winner_user) FROM public."Games" WHERE "winner_user" = '${data.userName}'`,
    );
    if (pic.length > 0) {
      let userInfo = {
        userName: data.userName,
        picture: pic[0].picture,
        country: 'Morocco',
        winMatch: this.userRepo.query(
          `SELECT COUNT(winner_user) FROM public."Games" WHERE "winner_user"= '${data.userName}'`,
        ),
        loserMatch: this.userRepo.query(
          `SELECT COUNT(loser_user) FROM public."Games" WHERE "winner_user"= '${data.userName}'`,
        ),
      };

      const gameHistory = await this.userRepo.query(
        `select *  from public."Games" WHERE public."Games".winner_user = '${data.userName}' OR public."Games".loser_user = '${data.userName}'`,
      );

      var result = [];
      if (gameHistory.length > 0) {
        delete gameHistory[0].id;
        for (const element of gameHistory) {
          const win_pic = await this.userRepo.query(
            `select picture  from public."Users" WHERE public."Users"."userName" = '${element.winner_user}'`,
          );
          const lose_pic = await this.userRepo.query(
            `select picture  from public."Users" WHERE public."Users"."userName" = '${element.loser_user}'`,
          );
          result.push({
            winner: {
              userName: element.winner_user,
              score: element.Score.split('-')[0],
              picture: win_pic[0].picture,
            },

            loser: {
              userName: element.loser_user,
              score: element.Score.split('-')[1],
              picture: lose_pic[0].picture,
            },
            played_at: gameHistory[0].played_at,
          });
        }
      }
      const profileInfo = {
        userInfo: userInfo,
        gameHistory: result,
      };
      return profileInfo;
    }
    return [];
  }

  @Get('me')
  async findFriends(@Body() data: FriendsInviteDto, @Req() request: Request) {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const tokenInfo: any = this.jwtService.decode(jwt);
    const userName = await this.userRepo.query(
      `select "id" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`,
    );
    return this.friendService.findAll(userName);
  }

  @Post('accept')
  async acceptFriend(@Body() data: FriendsInviteDto, @Req() request: Request) {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const tokenInfo: any = this.jwtService.decode(jwt);
    const userName = await this.userRepo.query(
      `select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`,
    );
    const id = await this.userRepo.query(
      `select "id" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`,
    );
    console.log(userName[0].userName, data.sender_id);
    return this.friendService.acceptFriend(
      userName[0].userName,
      data.sender_id,
      id[0].id,
    );
  }

  @Post('send')
  async sendInv(@Body() data: FriendsInviteDto, @Req() request: Request) {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const tokenInfo: any = this.jwtService.decode(jwt);
    const user = await this.userRepo.query(
      `select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`,
    );
    console.log('tokenInfo.userId : ', request);

    return this.friendService.sendInv(user[0].userName, data.recipent_id);
  }

  @Post('cancell')
  async cancellInv(@Body() data: FriendsInviteDto, @Req() request: Request) {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const tokenInfo: any = this.jwtService.decode(jwt);
    const user = await this.userRepo.query(
      `select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`,
    );

    this.friendService.cancellInv(user[0].userName, data.recipent_id);
  }

  @Post('reject')
  async rejectInv(@Body() data: FriendsInviteDto, @Req() request: Request) {
    console.log('here');
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const tokenInfo: any = this.jwtService.decode(jwt);
    const userName = await this.userRepo.query(
      `select public."Users"."userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`,
    );
    const userId = await this.userRepo.query(
      `select "id" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`,
    );

    //  const userName = await this.userRepo.query(`SELECT "userName", "picture" FROM public."Users";`);
    return this.friendService.rejectFriend(
      userName[0].userName,
      data.recipent_id,
      userId[0].id,
    );
    // return this.friendService.findAll(userName);
  }

  @Get('block')
  async BlockedFriends(@Req() request: Request) {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const tokenInfo: any = this.jwtService.decode(jwt);
    const userId = await this.userRepo.query(
      `select "id" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`,
    );
    let user_blocked = await this.userRepo
      .query(`select public."Users"."userName", public."Users"."picture"  FROM public."Users"
		WHERE  public."Users"."userName" IN 
		(select "Blocked" FROM public."FriendBlocked" WHERE public."FriendBlocked"."userId" = '${userId[0].id}')
		`);
    console.log(user_blocked);

    return user_blocked;
  }

  @Post('block')
  async BlockFriend(@Body() data: frienduser, @Req() request: Request) {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const tokenInfo: any = this.jwtService.decode(jwt);

    let CurrentUserName: string;
    let CurrentUserId: number;
    let FriendUserName: string;
    let FriendUserID: number;

    const userId = await this.userRepo.query(
      `select "id" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`,
    );

    const userName = await this.userRepo.query(
      `select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`,
    );

    const FriendId = await this.userRepo.query(
      `select "id" from public."Users" WHERE public."Users"."userName" = '${data.userName}'`,
    );

    CurrentUserId = userId[0].id;
    CurrentUserName = userName[0].userName;
    FriendUserName = data.userName;
    FriendUserID = FriendId[0].id;
    const ifUserBlocked = await this.userRepo.query(`SELECT  "Blocker" \
    FROM public."FriendBlocked" WHERE "Blocker" = '${data.userName}' AND "Blocked" = '${FriendUserName}'`);

    if (ifUserBlocked.length == 0 && CurrentUserName != FriendUserName) {
      //Delete from friends

      console.log(CurrentUserName, FriendUserID);
      await this.userRepo.query(
        `DELETE FROM public."FriendLsit"
        WHERE public."FriendLsit"."userName" = '${CurrentUserName}' AND  public."FriendLsit"."userId" = '${FriendUserID}'`,
      );

      await this.userRepo.query(
        `DELETE FROM public."FriendLsit"
          WHERE public."FriendLsit"."userName" = '${FriendUserName}' AND  public."FriendLsit"."userId" = '${CurrentUserId}'`,
      );

      FriendUserID = FriendId[0].id;
      await this.userRepo.query(
        `INSERT INTO public."FriendBlocked"("Blocker", "userId", "Blocked") VALUES ('${CurrentUserName}', '${CurrentUserId}', '${FriendUserName}')`,
      );
    }
  }

  @Post('unblock')
  async unBlockFriend(@Body() data: frienduser, @Req() request: Request) {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const tokenInfo: any = this.jwtService.decode(jwt);
    const userId = await this.userRepo.query(
      `select "id" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`,
    );

    await this.userRepo.query(
      `DELETE FROM public."FriendBlocked" WHERE  "Blocked" = '${data.userName}' AND "userId" = '${userId[0].id}'`,
    );
  }

  @Post()
  removeFriend() {
    // return this.friendService.findAll();
  }
}
