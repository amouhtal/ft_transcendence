import { IsNotEmpty, IsString } from 'class-validator';
import { Games } from 'src/entities/game.entity';

export class GamesDto extends Games {

  @IsString()
  @IsNotEmpty()
  winner_user: string;
  
  @IsString()
  @IsNotEmpty()
  loser_user: string;

  @IsString()
  @IsNotEmpty()
  Score: string;

  played_at: Date;
}


