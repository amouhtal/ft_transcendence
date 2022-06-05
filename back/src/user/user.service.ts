import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { info } from 'console';
import { UserDto } from 'src/dto-classes/user.dto';
// import { User } from "src/entities/user.entity";
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { ExampleDto } from './user.controller';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async setTwoFactorAuthenticationSecret(secret: string, email: string) {
    let id: number = await this.usersRepository.query(
      `select id from public."Users" WHERE public."Users"."email" = '${email}'`,
    );
    return this.usersRepository.update(id, {
      twoFactorAuthenticationSecret: secret,
    });
  }

  async turnOnTwoFactorAuthentication(email: string) {
    let id;
    try {
      id = await this.usersRepository.findOneBy({ email: email });
    } catch (e) {
    }
    await this.usersRepository.update(id.id, {
      isTwoFactorAuthenticationEnabled: true,
    });
  }

  public async InsertUser(userDto: UserDto) {
    // const userData = await this.usersRepository.create(userDto);
    // await this.usersRepository.save(userData);
    try {
      const userData = await this.usersRepository
        .createQueryBuilder()
        .insert()
        .into('Users')
        .values(userDto)
        .onConflict('("id") DO NOTHING')
        .execute();
    } catch {
      return 'Message Receiver!';
    }
  }

  public async findAll() {
    /*
          const userff = await this.usersRepository.createQueryBuilder()
          .select('Games.winner_user').addSelect('Games.loser_user').addSelect('Games.Score').addSelect('Games.played_at')
          .from(Games, "Games").where("Games.winner_user= :value or Games.loser_user=:value", {value: "test_username3"}).getMany();
          
          console.log("=>", userff);
        const bothUsers = new Array()  

        userff.forEach(element => {
          let obj ={
            winner: {
                userName:element.winner_user,
                image:"test",
                score:element.Score.split("-")[0]
                },
                loser:{
                    userName:element.loser_user,
                    image:"test",
                    score:element.Score.split("-")[1]
                  },
                date:element.played_at
          }
          bothUsers.push(obj)
        });
            return bothUsers;*/
    return await this.usersRepository.query(`select * from Users`);
  }

  async findUser(request: ExampleDto, email: string): Promise<boolean> {
    const user = await this.usersRepository
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.userName = :name', { name: request.userName })
      .getOne();

    if (user == null) {
      await this.usersRepository
        .createQueryBuilder()
        .update(User)
        .set({ userName: request.userName })
        // .set({ picture: request.imageName })
        .where('email = :email', { email: email })
        .execute();
    }
    if (user == null) {
      return true;
    }
    return false;
  }

  async updateActive(stats : Boolean,userName : string)
  {
      var get = await this.usersRepository.query(`UPDATE public."Users" SET "isActive"= '${stats}' WHERE  "userName"= '${userName}'`)
      // var get = await this.userRep.query(`SELECT id, "senderId", "reciverId", message FROM public.messages WHERE "senderId" = '${SId}' and "reciverId" = '${RId}'`)
  }
  
  async findByemail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email: email });
  }

  public async getUserJwt(token: string) : Promise<User>{
    const tokenInfo: any = this.jwtService.decode(token);

    let user = await this.usersRepository
      .createQueryBuilder('Users')
      .select(['Users.userName'])
      .where('Users.email = :email', { email: tokenInfo.userId })
      .getOne();

    if (user) return user;
  }
}

// public async create(user : User) {
//     const newUser = await this.usersRepository.create(user);
//     // console.log(await this.usersRepository.save(user));
//     await this.usersRepository.save(newUser);

//     return newUser;
// }
