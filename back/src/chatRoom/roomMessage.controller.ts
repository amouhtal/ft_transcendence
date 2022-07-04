import { Body, Controller, Get, Post,Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtAuthGuard } from "src/guards/jwt-auth.gguard";
import { chatRoomService } from "./chatRoom.service";
import { Request } from 'express';
import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { chatRoom } from "src/entities/chatRoom.entity";
import { connect } from "http2";
import { roomMessage } from "src/entities/roomMessage.entity";
import { roomMessageService } from "./roomMessage.service";
import { uDto } from "src/messages/message.controller";


@Controller('roomMessage')
export class roomMessageController {
	constructor(
		private readonly RoomService: roomMessageService ,
		@InjectRepository(roomMessage) private roomMessageRep: Repository<roomMessage>,
		@InjectRepository(User) private usersRepository: Repository<User>,
		private readonly jwtService: JwtService
	) {}

	async createRoomMessage(data : any)
	{
		let rMessage = await this.roomMessageRep.save(data)
		return  rMessage
	}

	// @Post('getConnversation')
	// async getRoomMessages(roomId : any)
	// {
	// 	console.log("RoomId=",roomId);
	// 	// console.log(await this.RoomService.getRoomMessages(roomId))
	// 	return await this.RoomService.getRoomMessages(roomId)
	// }
	@Post('getConnversation')
	@UseGuards(JwtAuthGuard)
	async getConv (@Body() roomId : any, @Req() request: Request ) 
	{
		const jwt = request.headers.authorization.replace('Bearer ', '');
		const tokenInfo : any = this.jwtService.decode(jwt);
		console.log("RoomId=",roomId.roomId);

		let conv : any = await  this.RoomService.getRoomMessages(roomId.roomId);
		return conv
	}
}
/* 
SELECT *
FROM subject
JOIN subject_note AS jt on jt.subject_id = subject.id
WHERE jt.note_id = :id 
*/