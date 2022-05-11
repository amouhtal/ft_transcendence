import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { info } from "console";
import { UserDto } from "src/dto-classes/user.dto";
import { User } from "src/entities/user.entity";
import {  Repository } from "typeorm";
import { ExampleDto } from "./user.controller";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User)
        private usersRepository: Repository<User>,
      )
      {

      }

      async setTwoFactorAuthenticationSecret(secret: string, email: string) {
        let id : number = await this.usersRepository.query(`select id from public."Users" WHERE public."Users"."email" = '${email}'`)
        return this.usersRepository.update(
          id, {
          twoFactorAuthenticationSecret: secret
        });
      }

      async turnOnTwoFactorAuthentication(email: string) {
        let id : number = await this.usersRepository.query(`select id from public."Users" WHERE public."Users"."email" = '${email}'`)

        return this.usersRepository.update(id, {
          isTwoFactorAuthenticationEnabled: true
        });
      }

      public async InsertUser( userDto : UserDto)
      {
            // const userData = await this.usersRepository.create(userDto);
            // await this.usersRepository.save(userData);
            try
            {
            const userData = await this.usersRepository.createQueryBuilder().insert().into('Users').values(userDto).onConflict('("id") DO NOTHING').execute();
            
            }
            catch
            {
              return "Message Receiver!";
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
          
           async findUser(request: ExampleDto, tokenInfo : any) : Promise<boolean>
          {
              const user = await this.usersRepository.createQueryBuilder().select("user").from(User, "user").where("user.userName = :name", { name: request.userName }).getOne();
	
              if (user == null)
              {
                await  this.usersRepository.createQueryBuilder()
                .update(User)
                .set({ userName: request.userName })
                .where("email = :email", { email: tokenInfo.email })
                .execute();
              }
              if (user == null)
              {
                return true;
              }
              return false;
          }
        
}

// public async create(user : User) {
//     const newUser = await this.usersRepository.create(user);
//     // console.log(await this.usersRepository.save(user));
//     await this.usersRepository.save(newUser);

//     return newUser;
// }