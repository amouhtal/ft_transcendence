
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { liveGame } from "./liveGame.entity";
import { roomMessage } from "./roomMessage.entity";
import { User } from "./user.entity";

@Entity('roomBannedUser')

export class roomBannedUser extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    bannedUserName : string
    @Column()
    roomId : number

    @Column()
    unBanTime : Date

    @Column()
    banType : string 
}
