
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { liveGame } from "./liveGame.entity";
import { roomMessage } from "./roomMessage.entity";
import { User } from "./user.entity";

@Entity('chat')

export class chatRoom extends BaseEntity
{
    @PrimaryGeneratedColumn({
        comment : 'the quiz unique indentifier',
    })
    id : number

    @Column()
    RoomOwner : string
    @Column()
    name : string

    @Column({default : "public"})
    type : string

    @Column({ nullable: true })
    password : string
    @OneToMany(() =>roomMessage,(message) => message.id)
    messageId : roomMessage[]

    @ManyToMany(() => User , (user) => user.userName)
    @JoinTable({name : 'chatIntUser'})
    members : User[]
}
