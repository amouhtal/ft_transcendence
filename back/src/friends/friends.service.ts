import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendLsit } from 'src/entities/friendList.entity';
import { FriendShip } from 'src/entities/friendShip.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class friendsService {
  constructor(
    @InjectRepository(FriendLsit)
    private friendListRepo: Repository<FriendLsit>,
    @InjectRepository(FriendShip)
    private friendShipRepo: Repository<FriendShip>,
    @InjectRepository(FriendLsit) private userRepo: Repository<User>,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async findAll(userId: Object): Promise<FriendLsit[] | undefined> {
    const names = await this.friendListRepo
      .createQueryBuilder('friends')
      .select('friends.userName')
      .where('friends.userId = :userId', { userId: userId[0].id })
      .getMany();
    let ret = [];
    for (const element of names) {
      const image: any = await this.userRepo.query(
        `select picture from public."Users" WHERE public."Users"."userName" = '${element.userName}'`,
      );
      ret.push({ userName: element.userName, picture: image[0]?.picture });
    }
    console.log(ret);
    return ret;
  }

  // @UseGuards(AuthGuard('jwt'))
  public async sendInv(sender: string, recipent: string) {
    const user = await this.userRepo.query(
      `select * from public."Users" WHERE public."Users"."userName" = '${recipent}'`,
    );

    if (user && sender != recipent) {
      // console.log(" sender" , sender, " recipent", recipent);
      let val = new FriendShip();
      val.sender_id = sender;
      val.recipent_id = recipent;
      const invExistInbase = await this.userRepo.query(
        `select * from public."FriendShip" WHERE public."FriendShip"."sender_id" = '${sender}' AND public."FriendShip"."recipent_id" = '${recipent}'`,
      );
      // const NotFriend = await this.userRepo.query(`select * from public."FriendShip" WHERE public."FriendShip"."sender_id" = '${sender}' AND public."FriendShip"."recipent_id" = '${recipent}'`);

      console.log(user, ' sender', sender, ' recipent', recipent);
      if (invExistInbase.length == 0) await this.friendShipRepo.save(val);
    }
  }

  public async cancellInv(sender: string, recipent: string) {
    let true_user = await this.userRepo.query(
      `select * from public."Users" WHERE public."Users"."userName" = '${recipent}'`,
    );

    if (true_user != 0) {
      let val = new FriendShip();
      val.sender_id = sender;
      val.recipent_id = recipent;
      let user = await this.userRepo.query(
        `select * from public."FriendShip" WHERE public."FriendShip"."sender_id" = '${sender}' AND public."FriendShip"."recipent_id" = '${recipent}'`,
      );
      if (user.length == 0) {
        val.sender_id = recipent;
        val.recipent_id = sender;
        user = await this.userRepo.query(
          `select * from public."FriendShip" WHERE public."FriendShip"."sender_id" = '${recipent}' AND public."FriendShip"."recipent_id" = '${sender}'`,
        );
      }
      if (user.length != 0) {
        console.log(user);
        await this.friendShipRepo.delete(val);
      }
    }
  }

  public async acceptFriend(Cuser: string, sender_id: string, id: number) {
    const user = await this.userRepo.query(
      `select * from public."FriendShip" WHERE public."FriendShip"."sender_id" = '${sender_id}' AND public."FriendShip"."recipent_id" = '${Cuser}'`,
    );
    if (user.length != 0) {
      let val = this.friendListRepo.create();
      val.userName = sender_id;
      val.user = id;
      await this.friendListRepo.save(val);
      // console.log("----> " ,val);
      // await this.userRepo.query(`INSERT INTO public."FriendLsit"( "userName", "userId") VALUES ('${sender_id}', '${id}')`)
      // console.log(user, Cuser, sender_id);
    }
    await this.friendShipRepo.query(
      `DELETE FROM public."FriendShip" WHERE sender_id='${sender_id}' and recipent_id='${Cuser}'`,
    );
  }

  public async rejectFriend(Cuser: string, recipent: string, id: number) {
    const user = await this.userRepo.query(
      `select * from public."Users" WHERE public."Users"."userName" = '${recipent}'`,
    );

    if (user) {
      let val = new FriendShip();
      val.sender_id = Cuser;
      val.recipent_id = recipent;
      const user = await this.userRepo.query(
        `select * from public."FriendShip" WHERE public."FriendShip"."sender_id" = '${Cuser}' AND public."FriendShip"."recipent_id" = '${recipent}'`,
      );
      if (user.length != 0) {
        await this.friendShipRepo.delete(val);
      }
    }
  }

  public async users(userName: any, userId: any) {
    // const user_unfriends = await this.userRepo.query(`select public."Users"."userName", public."Users"."picture" FROM public."Users" where public."Users"."userName" in ( \
    // select public."Users"."userName" FROM public."Users" \
    // except (select  public."FriendLsit"."userName" from  public."FriendLsit" where public."FriendLsit"."userId" =30 or  public."FriendLsit"."userName" = 'amouhtal') \
    // except (select  public."Users"."userName" from  public."Users" where public."Users"."id" = (select  public."FriendLsit"."userId" from  public."FriendLsit" where public."FriendLsit"."userName" = 'amouhtal') \
    // except (select public."FriendShip"."sender_id" from  public."FriendShip" WHERE public."FriendShip"."recipent_id" = 'amanar') except (select public."FriendShip"."recipent_id" from  public."FriendShip" WHERE public."FriendShip"."sender_id" = 'amouhtal')))`);
    const user_rinvite = await this.userRepo
      .query(` select public."Users"."userName", public."Users"."picture" FROM public."Users" where public."Users"."userName" in \
		( select  public."FriendShip"."sender_id" from  public."FriendShip" WHERE public."FriendShip"."recipent_id" = '${userName}'
		)`);
    
    const user_sinvite = await this.userRepo
    .query(`select public."Users"."userName", public."Users"."picture" FROM public."Users" where public."Users"."userName" in \
		( select public."FriendShip"."recipent_id" from  public."FriendShip" WHERE public."FriendShip"."sender_id" = '${userName}') `);
    
    const user_friends = await this.userRepo.query(
      `select public."Users"."userName", public."Users"."picture" FROM public."Users" where public."Users"."userName" in ( SELECT  "userName" FROM public."FriendLsit" WHERE "userId" = '${userId}') OR public."Users"."userName" in ( SELECT  "userName" FROM public."Users" WHERE   "id" in (select "userId" from public."FriendLsit" WHERE "userName" = '${userName}'))`,
      );
    // console.log( user_friends);
    // const blocked_friends = await this.userRepo.query(`select public."Users"."userName", public."Users"."picture"  FROM public."Users"
    // WHERE  public."Users"."userName" IN
    // (select "userName" FROM public."FriendBlocked" WHERE public."FriendBlocked"."userId" = '${userId}')
    // console.log(userId)
    // `);
    
    let blocked_friends = await this.userRepo
    .query(`select public."Users"."userName", public."Users"."picture"  FROM public."Users" \
    WHERE  public."Users"."userName" IN \
    (select "userName" FROM public."FriendBlocked" WHERE public."FriendBlocked"."userId" = '${userId}') \
    `);
    
    console.log('--->', userName);
    const all_users = await this.userRepo
      .query(`select public."Users"."userName", public."Users"."picture"  FROM public."Users" \
		WHERE  public."Users"."userName" NOT IN (select "Blocked" FROM public."FriendBlocked" WHERE public."FriendBlocked"."userId" = '${userId}' OR public."FriendBlocked"."Blocker" = '${userName}') \
		`);
    // AND NOT IN \
    // public."Users"."userName" IN (select "userName" FROM public."Users" WHERE public."Users"."id"=(select "userId" FROM public."FriendBlocked" WHERE public."FriendBlocked"."userName" = '${userName}')) \
    const ret = {
      all_users,
      user_rinvite,
      user_friends,
      user_sinvite,
      blocked_friends,
    };

    return ret;
  }

  // select public."Users"."userName"
  // FROM public."Users"
  // except (select  public."FriendLsit"."userName" from  public."FriendLsit" where public."FriendLsit"."userId" =30 or  public."FriendLsit"."userName" = 'amouhtal')
  // except (select  public."Users"."userName" from  public."Users" where public."Users"."id" = (select  public."FriendLsit"."userId" from  public."FriendLsit" where public."FriendLsit"."userName" = 'amouhtal'))

  // SELECT  public."Users"."userName"
  // FROM  public."Users"
  // except (select public."FriendShip"."sender_id" from  public."FriendShip" WHERE public."FriendShip"."recipent_id" = 'amanar')
  // except (select public."FriendShip"."recipent_id" from  public."FriendShip" WHERE public."FriendShip"."sender_id" = 'amanar')

  public async friendStatus(userName: string) {
    let friend: any;
    let pending: any;

    let obj = {
      friend: 'false',
      pending: 'false',
    };

    friend = await this.friendListRepo.findOneBy({ userName: userName });

    if (friend) obj.friend = 'true';
    if (!friend)
      pending = await this.friendShipRepo.findOneBy({ sender_id: userName });

    if (pending && !friend) obj.pending = 'true';

    if (!pending && !friend)
      pending = await this.friendShipRepo.findOneBy({ recipent_id: userName });
    if (pending && !friend) obj.pending = 'true';
    console.log(obj);
    return obj;
  }
}
