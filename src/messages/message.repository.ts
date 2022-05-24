import { InjectRepository } from "@nestjs/typeorm";
import { messages } from "src/entities/message.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(messages)

export class messageRepository extends Repository<messages> {

}