import { Body, Controller, Post,Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.gguard";
import { chatRoomService } from "./chatRoom.service";
import { Request } from 'express';
import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { chatRoom } from "src/entities/chatRoom.entity";
import { connect } from "http2";

export class gID {
	gameId : number
}

@Controller('chatRoom')
export class chatRoomController {
	constructor(
		private readonly RoomService: chatRoomService ,
		@InjectRepository(chatRoom) private roomRep: Repository<chatRoom>,
		@InjectRepository(User) private usersRepository: Repository<User>,
		private readonly jwtService: JwtService
	) {}

	@Post('create')
	@UseGuards(JwtAuthGuard)
	async createRoom(@Body() body :any, @Req() request: Request )
	{
		console.log("here")
		const jwt = request.headers.authorization.replace('Bearer ', '');
		this.RoomService.createRoom(jwt,body)
	}

	@Post('addUser')
	@UseGuards(JwtAuthGuard)
	async addUser(@Body() gameId :any, @Req() request: Request )
	{
		console.log("here")
		const jwt = request.headers.authorization.replace('Bearer ', '');
		const tokenInfo : any = this.jwtService.decode(jwt);
		let user : User = await this.usersRepository.createQueryBuilder('Users').where('Users.email = :email', { email: tokenInfo.userId }).getOne();
		// let users = await this.usersRepository.find({ relations: ['chatRooms'] , where: { email: tokenInfo.userId }});
		const chat = await this.roomRep
			.createQueryBuilder("chat")
			.leftJoinAndSelect("chat.members", "Users").where('chat.id = :id', { id: gameId.gameId })
			.getMany();
		chat[0].members = [...chat[0].members ,user]
		chat[0].save()

		// let game : chatRoom = await this.RoomService.getRoomById(gameId.gameId)
		// console.log("=======")
		// console.log(user)
		// console.log("=======")
		// console.log(game.members)
		// // game.members.push(user)
		// user.chatRooms = [game]
		// game.members  = [user]
	}


}
/* 
SELECT *
FROM subject
JOIN subject_note AS jt on jt.subject_id = subject.id
WHERE jt.note_id = :id 
*/