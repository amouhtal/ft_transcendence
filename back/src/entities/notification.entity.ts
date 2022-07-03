import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity('notification')

export class Notification extends BaseEntity
{
    @PrimaryGeneratedColumn({
        comment : 'the quiz unique indentifier',
    })
    id : number

    @Column()
    senderName : string
    @Column()
    reciverName : string

    @Column()
    type : string

    @Column()
    time : Date

}
