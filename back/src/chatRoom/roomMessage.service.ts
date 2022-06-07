import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { chatRoomDto } from "src/dto-classes/chatRoom.dto";
import { chatRoom } from "src/entities/chatRoom.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/entities/user.entity";
import { roomMessage } from "src/entities/roomMessage.entity";
@Injectable()
export class roomMessageService
{
	constructor(
		@InjectRepository(roomMessage) private RoomRepository: Repository<roomMessage>,
		@InjectRepository(User) private usersRepository: Repository<User>,
		private readonly jwtService: JwtService
	){}

	async creatRoomMessage(token : string , body :any)
	{
		const tokenInfo : any = this.jwtService.decode(token);
		let user_info = await this.usersRepository.query(`select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`);
		var ow : User 
		if(Object.keys(user_info).length != 0)
		{
			
		}
	}

	async getRoomMessages(roomId : number )
	{
		let messages = await this.RoomRepository.find({roomId : roomId})
		console.log("here")

		return messages

	}
}