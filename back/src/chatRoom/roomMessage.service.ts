import { Controller, Injectable, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { chatRoomDto } from "src/dto-classes/chatRoom.dto";
import { chatRoom } from "src/entities/chatRoom.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/entities/user.entity";
import { roomMessage } from "src/entities/roomMessage.entity";
import { JwtAuthGuard } from "src/guards/jwt-auth.gguard";
@Injectable()

export class roomMessageService
{
	constructor(
		@InjectRepository(roomMessage) private RoomRepository: Repository<roomMessage>,
		@InjectRepository(User) private usersRepository: Repository<User>,
		private readonly jwtService: JwtService
	){}

	async creatRoomMessage(sender : string , body :any)
	{
		
		let message : roomMessage = await this.RoomRepository.create()
		message.message  = body.message
		message.roomId = body.roomId
		message.senderId = sender
		message.time = new Date()
		await message.save()
		return
	}

	async getRoomMessages(roomId : number )
	{
		let messages = await this.RoomRepository.findBy({roomId : roomId})
		return messages
	}

	async deleteMessagesRoom(roomId : number)
	{
		await this.RoomRepository.delete({roomId : roomId})
	}
	async changeName(oldUserName : string, newUserName : string)
    {
        await this.RoomRepository.query(`UPDATE public."roomMessage" SET "senderId"='${newUserName}' WHERE "senderId"='${oldUserName}'`);
    }
}