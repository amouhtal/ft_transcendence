import { IsNotEmpty, IsString } from "class-validator";
import { FriendShip } from "src/entities/friendShip.entity";


export class FriendsInviteDto extends FriendShip {
    // @ManyToOne(() => User, user => user.photos)
    //   user: User;
    @IsString()
    @IsNotEmpty()
    winner_user: string;
  
    @IsString()
    @IsNotEmpty()
    loser_user: string;
  
    @IsNotEmpty()
    @IsString()
    Score: string;
  
    played_at: Date;
  }