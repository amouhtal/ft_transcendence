import { LiveGameDto } from "src/dto-classes/liveGame.dto";
import { liveGame } from "src/entities/liveGame.entity";
import { Repository } from "typeorm";
export declare class liveGameService {
    private liveGameRepository;
    constructor(liveGameRepository: Repository<liveGame>);
    saveGame(game: LiveGameDto): Promise<void>;
    getGame(player: string): Promise<any>;
    getGameByPlayer(player: string): Promise<string>;
    deleteGame(player: string): Promise<void>;
}
