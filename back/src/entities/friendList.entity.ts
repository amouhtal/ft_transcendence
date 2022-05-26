import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { User } from './user.entity';

@Entity('FriendLsit')
export class FriendLsit  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @ManyToOne( () => User, user => user.friends )
  user: number;
}

@Entity('FriendBlocked')
export class FriendBlocked  {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Blocker: string;

  @Column()
  Blocked: string;

  @ManyToOne( () => User, user => user.friendsBlocked )
  user: number;
}
