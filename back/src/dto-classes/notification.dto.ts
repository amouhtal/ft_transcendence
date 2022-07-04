import { IsNotEmpty } from "class-validator";
import { roomMessage } from "src/entities/roomMessage.entity";
import { User } from "src/entities/user.entity";

export class notificationDto{

	senderName : string
   
	reciverName : string

    type : string

    time : Date

}