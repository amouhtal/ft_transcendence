import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtAuthGuard } from "src/guards/jwt-auth.gguard";
import { roomBannedUserService } from "./roomsBannedUser.service";


@Controller('roomBannedUsers')
export class roomBannedUsersController {
	constructor(
		private readonly roomBannedUserServ: roomBannedUserService ,
		// @InjectRepository(roomMessage) private roomMessageRep: Repository<roomMessage>,
		// @InjectRepository(User) private usersRepository: Repository<User>,
		private readonly jwtService: JwtService
	) {}

    @Post("muteUser")
	@UseGuards(JwtAuthGuard)
    async muteUser(@Body() data : any)
    {
        await this.roomBannedUserServ.muteUser(data.userName, data.roomId, data.periode)
    }

    @Post("getMutedUserByRoomId")
	@UseGuards(JwtAuthGuard)
    async getMutedUserByRoomId(@Body() data : any)
    {
       return await this.roomBannedUserServ.getMutedUserByRoomId(data.roomId)
    }

    @Post("getBannedUserByRoomId")
	@UseGuards(JwtAuthGuard)
    async getBannedUserByRoomId(@Body() data : any)
    {
       return await this.roomBannedUserServ.getBannedUserByRoomId(data.roomId)
    }
    @Post("unbanUser")
	@UseGuards(JwtAuthGuard)
    async unbanUser(@Body() data : any)
    {
       return await this.roomBannedUserServ.unbanUser(data.userName,data.roomId)
    }
}
