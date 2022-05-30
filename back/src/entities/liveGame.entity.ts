import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany, ManyToMany } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { User } from './user.entity';
import { now } from 'moment';

@Entity('liveGame')
export class liveGame  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  player1: string;

  @Column()
  player2: string;

  @Column( )
  time : Date

  @OneToMany( () => User , (user) => user.id)
  watchers : User[]
}