import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('Games')
export class Games {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => User, user => user.photos)
  //   user: User;

  //@ManyToOne(() => User, user => user.id)
  @Column()
  winner_user: string;

  //@ManyToOne(() => User, user => user.id)
  @Column()
  loser_user: string;

  @Column()
  Score : string;

  @CreateDateColumn()
  played_at: Date;

}