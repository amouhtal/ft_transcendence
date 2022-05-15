import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany, Unique } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { User } from './user.entity';

@Entity('FriendShip')
export class FriendShip  {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sender_id: string;

  @Column()
  recipent_id: string;
}