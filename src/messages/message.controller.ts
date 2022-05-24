import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { messageDto } from "src/dto-classes/message.dtp";
import { messageRepository } from "src/messages/message.repository";
import { messageService } from "src/messages/message.service";

@Controller('message')
export class messageController{
	constructor( private messageServ : messageService){
		
	}
	@Post('add')
	@UsePipes(ValidationPipe)
	async saveMessage (@Body() message : messageDto) 
	{
	  return  await this.messageServ.createMessage(message)
	}
	@Post('grapMessages')
	@UsePipes(ValidationPipe)
	async getAllMessagesById (@Body() userId :number) 
	{

	}
}