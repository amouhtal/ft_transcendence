import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { FriendBlocked, FriendLsit } from './friendList.entity';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true, unique: true })
  userName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  picture: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => FriendLsit, (friend) => friend.userName)
  friends: FriendLsit[];

  @OneToMany(() => FriendBlocked, (friend) => friend.Blocker)
  friendsBlocked: FriendBlocked[];

  @Column({ nullable: true })
  public twoFactorAuthenticationSecret?: string;

  @Column({ default: false })
  public isTwoFactorAuthenticationEnabled: boolean;

  @Column({ default: false })
  public bypassTwoFactorAuthentication: boolean;
}
