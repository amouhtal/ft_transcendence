import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';


@Entity('FriendShip')
export class FriendShip  {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sender_id: string;

  @Column()
  recipent_id: string;
}