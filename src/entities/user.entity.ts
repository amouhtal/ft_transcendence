import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { chatRoom } from './chatRoom.entity';
import { FriendBlocked, FriendLsit } from './friendList.entity';
import { liveGame } from './liveGame.entity';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
  
  
  @Column({nullable: true, unique:true})
  userName: string;
  
  @Column({unique : true})
  email: string;
  
  @Column()
  picture : string

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => FriendLsit, friend => friend.userName)
  friends: FriendLsit[];

  @OneToMany(() => FriendBlocked, friend => friend.userName)
  friendsBlocked: FriendBlocked[];

  @Column({ nullable: true })
  public twoFactorAuthenticationSecret?: string;

  @Column({ default: false })
  public isTwoFactorAuthenticationEnabled: boolean;

  @Column({ default: false })
  public bypassTwoFactorAuthentication: boolean;

  @ManyToMany( () => chatRoom , (room) => room.id)
  @JoinTable({name : 'chatIntUser'})
  chatRooms : chatRoom[]

  @ManyToOne( () => liveGame , (live) => live.id , {nullable :true})
  liveGame : liveGame
}
