import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/guards/jwt-auth.gguard";
import { liveGameService } from "./liveGame.service";



@Controller('livegames')
export class livegamecontroller{

    constructor(private readonly livegameservice: liveGameService)
    {}

    @Get()
    async getlivegames()
    {
        return this.livegameservice.getgames();
    }
    @Post('getLiveGameByUserName')
    @UseGuards(JwtAuthGuard)
    async getLiveGameByUserName(@Body() body :any)
    {
       return await this.livegameservice.getLiveGame(body.userName)
    }
}