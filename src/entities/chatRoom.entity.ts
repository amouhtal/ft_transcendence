
import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { roomMessage } from "./roomMessage.entity";
import { User } from "./user.entity";

@Entity('chat')

export class chatRoom extends BaseEntity
{
    @PrimaryGeneratedColumn({
        comment : 'the quiz unique indentifier',
    })
    id : number

    
    @OneToMany(() =>roomMessage,(message) => message.id)
    messageId : roomMessage[]

    @ManyToMany(() => User , (user) => user.userName)
    members : User[]
}