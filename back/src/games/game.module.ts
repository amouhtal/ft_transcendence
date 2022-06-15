import {  Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Games } from "src/entities/game.entity";
import { gamesController } from "./game.controller";
import { GamesService } from "./game.service";


@Module({
    imports: [TypeOrmModule.forFeature([Games])],
    controllers: [gamesController], 
    providers: [GamesService]
})


export class gameModule{}