import { Games } from 'src/entities/game.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

export class GamesDto extends Games {

  // @ManyToOne(() => User, user => user.photos)
  //   user: User;

  winner_user: string;

  loser_user: string;

  Score: string;

  played_at: Date;
}