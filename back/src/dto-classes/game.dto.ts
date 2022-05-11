import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';

export class GamesDto {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => User, user => user.photos)
  //   user: User;

    player1: number;

    player2: number;

    Score : string;

    played_at: Date;

}