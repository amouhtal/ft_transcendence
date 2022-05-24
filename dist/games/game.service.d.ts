import { GamesDto } from "src/dto-classes/game.dto";
import { Games } from "src/entities/game.entity";
import { Repository } from "typeorm";
export declare class GamesService {
    private gamesRepository;
    constructor(gamesRepository: Repository<Games>);
    findAll(): Promise<Games[]>;
    InsertGame(gamesDto: GamesDto): Promise<void>;
}
