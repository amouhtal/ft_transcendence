import { Body, Controller, Post,Req, UseGuards } from "@nestjs/common";
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


@Controller('roomMessage')
export class roomMessageController {
	constructor(
		private readonly RoomService: roomMessageService ,
		@InjectRepository(roomMessage) private roomRep: Repository<roomMessage>,
		@InjectRepository(User) private usersRepository: Repository<User>,
		private readonly jwtService: JwtService
	) {}

}
/* 
SELECT *
FROM subject
JOIN subject_note AS jt on jt.subject_id = subject.id
WHERE jt.note_id = :id 
*/