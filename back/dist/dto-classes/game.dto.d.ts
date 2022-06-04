import { Games } from 'src/entities/game.entity';
export declare class GamesDto extends Games {
    winner_user: string;
    loser_user: string;
    Score: string;
    played_at: Date;
}
