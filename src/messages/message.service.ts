import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { messageDto } from 'src/dto-classes/message.dtp';
import { messages } from 'src/entities/message.entity';
import { User } from 'src/entities/user.entity';
import { messageRepository } from 'src/messages/message.repository';
import {getConnection, Repository} from "typeorm";
@Injectable()
export class messageService {

    constructor(@InjectRepository(messageRepository) private messageRep : messageRepository
        ){
        
    }

    async getMessageById(username :number)
    {
        return await this.messageRep.findOne({id : username})
    }

    async createMessage(message : messageDto)
    {
        return await this.messageRep.save(message)
    }

    async getConversation(SId : string , RId : string) 
    {
        var get = await this.messageRep.query(`SELECT id, "senderId", "reciverId" , "time", message FROM public.messages WHERE "senderId" = '${SId}' and "reciverId" = '${RId}' or "senderId" = '${RId}' and "reciverId" = '${SId}' ORDER by time`)
        // console.log(get)
        // var get = await getConnection().createQueryBuilder().select('`senderId`').from(messages,"`senderId`").where("\'senderId\' = :id ", { id: 1 }).andWhere("\'reciverId\' = :id ", { id: 2 }).getMany();
        // var get = await   this.messageRep.createQueryBuilder("message").select('`senderId`').select('`reciverId`').where("senderId = :id ", { id: 1 }).andWhere("reciverId = :id ", { id: 2 }).getMany();

        return (get);
    }

    async getConntact(user : string )
    {
        var  name  : any = await this.messageRep.query(`SELECT "userName"  , "picture" , "isActive" from public."Users" Where "userName" IN
        (select "reciverId"
            FROM public."messages" WHERE "senderId" = '${user}') 
         OR "userName" IN (select "senderId"
            FROM public."messages" WHERE "reciverId" = '${user}')`)

        return name
    }
}
