import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthService } from "src/auth/auth.service";
import { Notification } from "src/entities/notification.entity";
import { JwtAuthGuard } from "src/guards/jwt-auth.gguard";
import { Repository } from "typeorm/repository/Repository";
import { notificationService } from "./notification.service";

@Controller('auth/42')
export class notificationController {
  constructor(
    private  notificationServ : notificationService,
    @InjectRepository(Notification)
    private usersRepository: Repository<Notification>,
  ) {}


  @Get('allNotification')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  async getAllNotification (@Body() token :any) 
  {
    return this.notificationServ.getNotifications(token)

  }
}