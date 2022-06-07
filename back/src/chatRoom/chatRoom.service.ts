import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { chatRoomDto } from "src/dto-classes/chatRoom.dto";
import { chatRoom } from "src/entities/chatRoom.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/entities/user.entity";
import { UserService } from "src/user/user.service";
@Injectable()
export class chatRoomService
{
	constructor(private userServ : UserService,
		@InjectRepository(chatRoom) private RoomRepository: Repository<chatRoom>,
		@InjectRepository(User) private usersRepository: Repository<User>,
		private readonly jwtService: JwtService
	){}

	async createRoom(token : string , body :any)
	{
		const tokenInfo : any = this.jwtService.decode(token);
		let user_info = await this.usersRepository.query(`select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`);
		var ow : User 
		if(Object.keys(user_info).length != 0)
		{
			let userName = user_info[0].userName
			let user = await this.usersRepository.findOneBy({userName : userName})
			let room = await this.RoomRepository.create({ RoomOwner : userName })
			room.members = [user]
			room.name = body.name
			if(body.type == "private")
			{
				room.type = "private"
				room.password = body.password
			}
			if(body.user.length != -1)
			{
				for(let us of body.user)
				{
					ow =await this.userServ.findByUserName(us.userName)
					room.members = [...room.members,user]
				}
			}
			console.log(user_info)
			await room.save();
			// console.log( await this.RoomRepository.save(room))
		}
	}

	async getRoomById(gameId : number )
	{
		console.log("here")
		let game = await this.RoomRepository
		.createQueryBuilder("chat")
		.leftJoinAndSelect("chat.members", "Users").where('chat.id = :id', { id: gameId })
		.getOne();

		return game

	}
}