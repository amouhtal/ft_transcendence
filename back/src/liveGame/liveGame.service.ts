import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LiveGameDto } from "src/dto-classes/liveGame.dto";
import { FriendLsit } from "src/entities/friendList.entity";
import { FriendShip } from "src/entities/friendShip.entity";
import { liveGame } from "src/entities/liveGame.entity";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { Socket } from "socket.io";

@Injectable()
export class liveGameService
{
    constructor(
		@InjectRepository(liveGame) private liveGameRepository: Repository<liveGame>
	){}

    async saveGame(game : LiveGameDto)
    {
        this.liveGameRepository.save(game)
    }

    async getGame(player : string)
    {
        let liveGame : any = await this.liveGameRepository.query(`SELECT * FROM public."liveGame" WHERE player1 = '${player}' or player2 = '${player}'`)
        return liveGame
    }

   
    async getGameByPlayer(player : string)
    {
        let userName : any = await this.liveGameRepository.query(`SELECT  player1, player2 FROM public."liveGame" WHERE player1 = '${player}' or player2 = '${player}'`)
        var player2 : string
        if(Object.keys(userName).length !== 0)
        {
            player2 = userName[0].player1 === player ? userName[0].player2 : userName[0].player1
        }
        return player2
    }
    
    async deleteGame(player : string)
    {
        await this.liveGameRepository.query(`DELETE FROM public."liveGame" WHERE public."liveGame"."player1" = '${player}' or public."liveGame"."player2" = '${player}'` )
    }

     async getgames()
    {
        const games = await this.liveGameRepository.query('SELECT "player1", "player2", "time" FROM public."liveGame"');
        return games;
    }

}