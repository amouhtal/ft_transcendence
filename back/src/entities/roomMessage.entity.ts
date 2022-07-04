import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { chatRoom } from "./chatRoom.entity"

@Entity('roomMessage')
export class    roomMessage extends BaseEntity{

    @PrimaryGeneratedColumn({
        comment : 'the quiz unique indentifier',
    })
    id : number

    @Column()
    senderId : string

    @Column()
    message : string

    @Column()
    roomId : number    // @ManyToOne(() =>user,(user) => user.messages)
    // user : user
    @Column()
    time : Date

}