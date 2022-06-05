import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('messages')
export class    messages extends BaseEntity{

    @PrimaryGeneratedColumn({
        comment : 'the quiz unique indentifier',
    })
    id : number

    @Column()
    senderId : string
    
    @Column()
    reciverId : string

    @Column()
    message : string

    @Column()
    time : Date

}