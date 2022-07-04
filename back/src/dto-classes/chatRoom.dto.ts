import { IsNotEmpty } from "class-validator";
import { roomMessage } from "src/entities/roomMessage.entity";
import { User } from "src/entities/user.entity";

export class chatRoomDto{

	RoomOwner : string
   
	name : string

    type : string

	protected : boolean

    password : string
	
	messageId : roomMessage[]

	members : User[]

}