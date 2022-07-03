import { Controller, Get } from "@nestjs/common";
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
}