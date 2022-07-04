import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/entities/user.entity";
import { UserService } from "src/user/user.service";
import { Notification } from "src/entities/notification.entity";
import { notificationDto } from "src/dto-classes/notification.dto";

@Injectable()
export class notificationService 
{
	constructor(private userServ : UserService,
		@InjectRepository(Notification) private notificationRep: Repository<Notification>,
		@InjectRepository(User) private usersRepository: Repository<User>,
		private readonly jwtService: JwtService
	){}

    async saveNotification(noti : any ,senderName : string )
    {
        let data : Notification = this.notificationRep.create()
        data.senderName =  senderName
        data.reciverName = noti.reciverName
        data.type = noti.type
        data.time = new Date()
        return this.notificationRep.save(data)
    }
    async getNotifications(userName : string)
    {
        return this.notificationRep.findBy({reciverName : userName})
    }
}