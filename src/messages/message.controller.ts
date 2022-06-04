import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.gguard";
import { messageDto } from "src/dto-classes/message.dtp";
import { messageRepository } from "src/messages/message.repository";
import { messageService } from "src/messages/message.service";
import { Request } from 'express';
import { Repository } from "typeorm";
import { User } from "src/entities/user.entity";
import { JwtService } from "@nestjs/jwt";

export class uDto{
	userName : string
}

@Controller('message')
export class messageController{
	constructor( private messageServ : messageService,
		@InjectRepository(User) private usersRepository: Repository<User>  ,
		private readonly jwtService: JwtService){
		
	}
	@Post('add')
	@UsePipes(ValidationPipe)
	async saveMessage (@Body() message : messageDto) 
	{
	  return  await this.messageServ.createMessage(message)
	}
	@Get('getConntacts')
	@UsePipes(ValidationPipe)
	@UseGuards(JwtAuthGuard)
	async getAllMessagesById (@Body() token :any, @Req() request: Request ) 
	{
		const jwt = request.headers.authorization.replace('Bearer ', '');
		const tokenInfo : any = this.jwtService.decode(jwt);
		let user = await this.usersRepository.query(`select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`);
		let Name = user[0].userName
		return await this.messageServ.getConntact(Name)
	}

	@Post('getConnversation')
	@UsePipes(ValidationPipe)
	@UseGuards(JwtAuthGuard)
	async getConv (@Body() reciver :uDto, @Req() request: Request ) 
	{
		const jwt = request.headers.authorization.replace('Bearer ', '');
		const tokenInfo : any = this.jwtService.decode(jwt);
		let user = await this.usersRepository.query(`select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`);
		let Name = user[0].userName
		let conv : any = await this.messageServ.getConversation(Name,reciver.userName)
		return conv
	}
}