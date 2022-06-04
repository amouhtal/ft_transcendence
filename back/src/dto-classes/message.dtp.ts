import { IsNotEmpty } from "class-validator";

export class messageDto{
	@IsNotEmpty()
	senderId : string
	@IsNotEmpty()
	reciverId : string
	@IsNotEmpty()
	message : string
	time : Date
}