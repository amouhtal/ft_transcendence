import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { SocketAddress } from "net";
import { EMPTY } from "rxjs";
import { Socket } from "socket.io";
import { messageDto } from "src/dto-classes/message.dtp";
import { User } from "src/entities/user.entity";
import { messageService } from "src/messages/message.service";
import { UserService } from "src/user/user.service";
import { Repository } from "typeorm";



var sockets = new Map<string,Array<Socket>>()
var matchMakingarray = new Array
@WebSocketGateway()
export class chatGateway implements OnGatewayConnection , OnGatewayDisconnect {


	constructor(private messageServ : messageService , private userServ : UserService, @InjectRepository(User)
	private usersRepository: Repository<User> ,
	private readonly jwtService: JwtService)
	{
	}
	async handleDisconnect(client: Socket) {
		let auth_token = client.handshake.auth.Authorization;
		if(auth_token !== "null" && auth_token !== "undefined")
		{
		const tokenInfo : any = this.jwtService.decode(auth_token);
		let sender_id = await this.usersRepository.query(`select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`);
		
		// if(hello.indexOf(5))
			// console.log("rah kayen fking bitch knee gears")
		// throw new Error("Method not implemented.");
		console.log("------ desconnection -----");
		let array  = sockets.get(sender_id[0].userName)
		let i = 0
		if(array != undefined)
		{
		array.forEach(element => {
			if (element.id == client.id )
				array.splice(i,1)
			i++
		});
	}
		if(array == undefined || array.length == 0)
			this.userServ.updateActive(false,sender_id[0].userName)
		if(array != undefined)
		{
			for (let [key, value] of sockets) {
				if(key == sender_id[0].userName)
				{
					for(let node of value)
						console.log(node.id)
				}
			}
		}
		console.log("----------------------");
		}
	}
	async handleConnection(client: Socket, ...args :any) {
		// if(hello.indexOf(5))
		let auth_token : string  = await client.handshake.auth.Authorization;

		if(auth_token !== "null" && auth_token !== "undefined")
		{
			const tokenInfo : any = this.jwtService.decode(auth_token);
			let sender_id = await this.usersRepository.query(`select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`);
			console.log("------ connection ...-----");
			if(sockets.get(sender_id[0].userName) != undefined)
			{
				for (let [key, value] of sockets) {
					if(key == sender_id[0].userName)
					{
						value.push(client);
						sockets.set(sender_id[0].userName,value)
						break;
					}
				}
			}
			else
			{
				var obj : Array<Socket> = [];
				obj.push(client);
				sockets.set(sender_id[0].userName,obj);
			}
			for (let [key, value] of sockets) {
				if(key == sender_id[0].userName)
				{
					for(let node of value)
						console.log(node.id)
				}
			}
			this.userServ.updateActive(true,sender_id[0].userName)
			console.log("-----------------------");
			}
		// throw new Error("Method not implemented.");
	}
	@WebSocketServer()
	server = [];
	@SubscribeMessage('message')
	async handleMessage(client : Socket , text: any){ 
		console.log("--------messaging-------------")
		let auth_token = client.handshake.auth;
		const tokenInfo : any = this.jwtService.decode(auth_token.Authorization);
		let sender_id = await this.usersRepository.query(`select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`);
		var data = new messageDto() 
		data.message = text[0] 
		data.senderId = sender_id[0].userName
		data.reciverId = text[1]
		data.time = new Date()
		console.log(data.time)
		await this.messageServ.createMessage(data)
		var senderMessages : messageDto = await this.messageServ.getConversation(data.senderId,data.reciverId);
		var reciverMessages : messageDto = await this.messageServ.getConversation(data.reciverId,data.senderId);
		var conversation :any  = [ { "sender" :  senderMessages } , {"reciver" : reciverMessages}]
		var senderSock : Socket[] = [];
		var reciverSock : Socket[] = [];
		senderSock = sockets.get(data.senderId);
		for(let ids of senderSock)
		{
			console.log(conversation)
			ids.emit("message",conversation)
		}
		reciverSock = sockets.get(data.reciverId);
		if(reciverSock != undefined)
		{
		for(let ids of reciverSock)
		{
			console.log("reciver")
			ids.emit("message",conversation)
		}
		
		}
		console.log("-------------------------------")

	}
	@SubscribeMessage('matchmaking')
	async matchmaking(client: Socket, test: any)
	{
		var player : Socket[] = [];	
		if (matchMakingarray.indexOf(test[0]) != -1){
			matchMakingarray.push(test[0])
		}

		if (matchMakingarray.length > 1){
			player = sockets.get(test[0])
			for(let ids of player)
			{
				if(matchMakingarray[0] == test[0])
					ids.emit("matchmaking", matchMakingarray[0])
				else
					ids.emit("matchmaking", matchMakingarray[1])
			}
			matchMakingarray.splice(0,2)
			return "match Found"
		}
		else
			return "still waiting"
	}
	@SubscribeMessage('playing')
	async playing()
	{
		
	}
}
/*SELECT "userName" from public."Users" Where "userName"
IN
(select "reciverId"
	FROM public."messages" WHERE "senderId" = 'mel-hamr') 
 OR "userName" IN (select "senderId"
	FROM public."messages" WHERE "reciverId" = 'mel-hamr') */