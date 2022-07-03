import {  Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Games } from "src/entities/game.entity";
import { gamesController } from "./game.controller";
import { GamesService } from "./game.service";

@Module({
    imports: [TypeOrmModule.forFeature([Games]), JwtModule.register({ secret: process.env.ACCESS_SECRET })],
    controllers: [gamesController], 
    providers: [GamesService]
})

export class gameModule{}