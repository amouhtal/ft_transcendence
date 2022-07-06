import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { match } from "assert";
import { now } from "moment";
import { SocketAddress } from "net";
import { EMPTY } from "rxjs";
import { Socket } from "socket.io";
import { chatRoomService } from "src/chatRoom/chatRoom.service";
import { roomMessageService } from "src/chatRoom/roomMessage.service";
import { roomBannedUserService } from "src/chatRoom/roomsBannedUser.service";
import { GamesDto } from "src/dto-classes/game.dto";
import { LiveGameDto } from "src/dto-classes/liveGame.dto";
import { messageDto } from "src/dto-classes/message.dtp";
import { notificationDto } from "src/dto-classes/notification.dto";
import { chatRoom } from "src/entities/chatRoom.entity";
import { liveGame } from "src/entities/liveGame.entity";
import { Notification } from "src/entities/notification.entity";
import { User } from "src/entities/user.entity";
import { GamesService } from "src/games/game.service";
import { liveGameService } from "src/liveGame/liveGame.service";
import { messageService } from "src/messages/message.service";
import { notificationService } from "src/notification/notification.service";
import { UserService } from "src/user/user.service";
import { Repository } from "typeorm";
import  gamePlayService  from "./gamePlay.service";


/*---------------------For Game ---------------------*/
export class moveData {
	player1 : number
	player2 : number
	movement : string
}
var playersStat = new Array
var ballStat = new Array
var intervals = new Array
var watchers = new Array
var mods = new Array
var opponentLeft = async (this_:any, sender_id:any) =>{
	if(matchMakingarray.indexOf(sender_id[0].userName) != -1)
		matchMakingarray.splice(matchMakingarray.indexOf(sender_id[0].userName),1)
	if (mods.indexOf(mods.find(element => element?.userName === sender_id[0].userName)) != -1)
		mods.splice(mods.indexOf(mods.find(element => element?.userName === sender_id[0].userName)),1)
	let player2 = await this_.liveGameServ.getGameByPlayer(sender_id[0].userName)
	if (typeof player2 != "undefined" && Object.keys(player2).length > 0)
	{
		console.log("test")
		var game : GamesDto = new(GamesDto)
		game.winner_user = player2
		game.loser_user = sender_id[0].userName
		game.Score = `D.N.F-D.N.F`
		game.played_at = new Date();
		
		this_.gameServ.InsertGame(game)
		this_.liveGameServ.deleteGame(sender_id[0].userName)
		var playerSocket : Socket[] = [];
		playerSocket = sockets.get(player2);
		if (typeof playersStat.find(element => element.player1 == sender_id[0].userName || element.player2 == sender_id[0].userName) != "undefined"){
			for(let ids of playerSocket)
			{
				ids.emit("opponentLeft",{user : player2})
			}
			let watchers_ = watchers.find(element => element.player1 == sender_id[0].userName || element.player2 == sender_id[0].userName).watchers
			for (let index = 0; index <  watchers_.length; index++) {
				let player : Socket[] = []
				player = sockets.get(watchers_[index])
				for(let ids of player)
				{
					ids.emit("opponentLeft",{user : player2})
				}
			}
			this_.gamePlaysServ.clearGames(intervals,ballStat, playersStat, sender_id[0].userName,mods)
		}
		this_.gamePlaysServ.checkWatchers(watchers, sender_id[0].userName)
	}
	else
		this_.gamePlaysServ.checkWatchers(watchers, sender_id[0].userName)
}

/*-----------------------------------------------------*/
var sockets = new Map<string,Array<Socket>>()

var matchMakingarray = new Array
@WebSocketGateway()
export class chatGateway implements OnGatewayConnection , OnGatewayDisconnect {


	constructor(private messageServ : messageService , private userServ : UserService, @InjectRepository(User)
	private usersRepository: Repository<User> , 
	private liveGameServ : liveGameService ,
	private gamePlaysServ : gamePlayService, 
	private roomMessageServ : roomMessageService,
	private chatRoomServ : chatRoomService ,
	private readonly jwtService: JwtService,
	private gameServ : GamesService,
	private  roomBannedUserServ: roomBannedUserService ,
	private notifServ : notificationService)
	{
	}
	@WebSocketServer()
	server : Socket;
	async handleDisconnect(client: Socket) 
	{
		let auth_token = await client.handshake.auth.Authorization;
		if(auth_token !== "null" && auth_token !== "undefined" && auth_token)
		{
			const tokenInfo : any = await this.jwtService.decode(auth_token);
			let sender_id = await this.usersRepository.query(`select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`);

			console.log("------ desconnection -----");
			if(Object.keys(sender_id).length !== 0)
			{
				opponentLeft(this,sender_id)
				let array  = sockets.get(sender_id[0].userName)	
				let i = 0
				let userRooms = await this.usersRepository.find({
				relations: ['chatRooms'],
				where: { userName: sender_id[0].userName }
				});
				let rooms : any = userRooms[0].chatRooms;
				if(rooms.length !== 0)
				{
					for(let room of rooms)
					{
						client.join(room.id.toString())
					}
				}
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
	}
	async handleConnection(client: Socket, ...args :any) 
	{
		// if(hello.indexOf(5))
		let auth_token : string  = await client.handshake.auth.Authorization;
		if(auth_token !== "null" && auth_token !== "undefined" && auth_token)
		{
			const tokenInfo : any = this.jwtService.decode(auth_token);
			let sender_id = await this.usersRepository.query(`select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`);
			console.log("------ connection ...-----");
			if(Object.keys(sender_id).length !== 0)
			{
				console.log(sender_id[0].userName)
				if( sockets.get(sender_id[0].userName) != undefined)
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
			}
		// throw new Error("Method not implemented.");
	}

	@SubscribeMessage('message')
	async handleMessage(client : Socket , text: any)
	{ 
		console.log("--------messaging-------------")
		let auth_token = await client.handshake.auth.Authorization;
		if(auth_token !== "null" && auth_token !== "undefined" && auth_token)
		{
			const tokenInfo : any = this.jwtService.decode(auth_token);
			let sender_id = await this.usersRepository.query(`select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`);
			if(Object.keys(sender_id).length !== 0)
			{
				var data = new messageDto() 
				data.message = text[0] 
				data.senderId = sender_id[0].userName
				data.reciverId = text[1]
				data.time = new Date()
				await this.messageServ.createMessage(data)
				var conversation : messageDto = await this.messageServ.getConversation(data.senderId,data.reciverId);
				var senderSock : Socket[] = [];
				var reciverSock : Socket[] = [];
				senderSock = sockets.get(data.senderId);
				if(senderSock !== null && senderSock !== undefined)
				{
					for(let ids of senderSock)
					{
						ids.emit("message",conversation)
					}
				}
				reciverSock = sockets.get(data.reciverId);
				if(reciverSock !== null && reciverSock !== undefined)
				{
					for(let ids of reciverSock)
					{
						ids.emit("message",conversation)
					}
				}
			}
		}
		console.log("-------------------------------")
	}

	@SubscribeMessage('matchmaking')
	async matchmaking(client: Socket, body: any)
	{
		let auth_token = await client.handshake.auth.Authorization;
		if(auth_token !== "null" && auth_token !== "undefined" && auth_token)
		{
			const tokenInfo : any = this.jwtService.decode(auth_token);
			let legal = "legal"
			let i = 0
			let user_id = await this.usersRepository.query(`select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`);
			var player : Socket[] = [];
			var player2 : Socket[] = [];
			console.log("----------matchMaking-------------")
			watchers.forEach(element => {
				if (element.watchers.indexOf(user_id[0].userName) != -1){
					legal = "illegal"
					return 0
				}
				i++
			});
			if (legal == "legal"){
				if (typeof playersStat.find(element => element.player1 == user_id[0].userName || element.player2 == user_id[0].userName) == "undefined"){
					if (matchMakingarray.indexOf(user_id[0].userName) == -1){
						matchMakingarray.push(user_id[0].userName)
						let speed =  isNaN(body.speed) ? 5 : parseInt(body.speed)
						let ballSize = isNaN(body.ballSize) ? 12.5 : 1000 / (1000  / parseInt(body.ballSize))
						if (body.speed == null || speed > 10 || speed < 1)
							speed = 5
						if (body.ballSize == null || ballSize < 4 || ballSize > 40)
							ballSize = 12.5
						mods.push({userName:user_id[0].userName,speed:speed ,ballSize:ballSize
						})
						console.log(mods)
					}
		
					if (matchMakingarray.length > 1)
					{
						let game : LiveGameDto = new(LiveGameDto)
						player = sockets.get(user_id[0].userName)
						player2 = sockets.get(matchMakingarray[0])
						game.player1 = matchMakingarray[0]
						game.player2 =  matchMakingarray[1]
						game.time = new Date()
						await this.liveGameServ.saveGame(game)
						this.gamePlaysServ.init(game.player1,game.player2,playersStat,ballStat,watchers,mods)
						for(let ids of player)
						{
							ids.emit("matchmaking", [matchMakingarray[0], matchMakingarray[1],"Found"])
						}
						for(let ids of player2)
						{
							ids.emit("matchmaking", [matchMakingarray[0], matchMakingarray[1],"Found"])
						}
						matchMakingarray.splice(0,2)
						mods.splice(0,2)
					}
					else
					{
						for(let ids of player)
						{
							ids.emit("matchmaking", "still waiting" )
						}
					}
				}else{
					let players = playersStat.find(element => element.player1 == user_id[0].userName || element.player2 == user_id[0].userName)
					player = sockets.get(user_id[0].userName)
					for(let ids of player)
					{
						ids.emit("matchmaking", [players.player1, players.player2,"playing"])
					}
				}
			}else {
				player = sockets.get(user_id[0].userName)
				for(let ids of player)
				{
					ids.emit("matchmaking",  [watchers[i].player1, watchers[i].player2,"Watcher"])
				}
			}
		}
	}
	@SubscribeMessage('setInterval')
	async setInterval(client: Socket, test: any)
	{
		let auth_token = await client.handshake.auth.Authorization;
		if(auth_token !== "null" && auth_token !== "undefined" && auth_token)
		{
			const tokenInfo : any = this.jwtService.decode(auth_token);
			let userInfo = await this.usersRepository.query(`select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`);
			if (Object.keys(userInfo).length > 0){
				let game : LiveGameDto = await this.liveGameServ.getGame(userInfo[0].userName)
				if (Object.keys(game).length !== 0){
					if (userInfo[0].userName == game[0].player1){
						let speed = ballStat.find(element => element.player1 == userInfo[0].userName || element.player2 == userInfo[0].userName).Settings.speed
						const interval = setInterval(() => this.gamePlaysServ.movingBall(userInfo[0].userName,ballStat,playersStat,sockets,intervals,watchers) , speed)
						intervals.push({id:interval,player1:game[0].player1,player2:game[0].player2})
					}
				}
			}
		}
	}
	@SubscribeMessage('addWatcher')
	async addWatcher(client: Socket, body: any)
	{
		let auth_token = await client.handshake.auth.Authorization;
		if(auth_token !== "null" && auth_token !== "undefined" && auth_token)
		{
			var player : Socket[] = [];
			let lega = ""
			const tokenInfo : any = this.jwtService.decode(auth_token);
			let userInfo = await this.usersRepository.query(`select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`);
			console.log("add Watchers =>",watchers)
			if (Object.keys(userInfo).length > 0){
				player = sockets.get(userInfo[0].userName)
					if(watchers.find(element => element.player1 == body || element.player2 == body).watchers.indexOf(userInfo[0].userName) == -1){
						watchers.find(element => element.player1 == body || element.player2 == body).watchers.push(userInfo[0].userName)
						lega = "added"
					}else{
						lega = "notAdded"
					}
				for(let ids of player)
				{
					ids.emit("addWatcher", lega)
				}
				console.log(watchers)
			}
		}
	}
	@SubscribeMessage('leaving')
	async leaving(client: Socket, test: any)
	{
		let auth_token = await client.handshake.auth.Authorization;
		if(auth_token !== "null" && auth_token !== "undefined" && auth_token)
		{
			const tokenInfo : any = this.jwtService.decode(auth_token);
			let userInfo = await this.usersRepository.query(`select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`);
			if (Object.keys(userInfo).length != 0){
				opponentLeft(this,userInfo)
			}
		}
	}
	@SubscribeMessage('playing')
	async playing(client: Socket, body: moveData)
	{
		console.log("--------playing-------------")
		let auth_token = await client.handshake.auth.Authorization;
		if(auth_token !== "null" && auth_token !== "undefined" && auth_token)
		{
			const tokenInfo : any = this.jwtService.decode(auth_token);
			let userInfo = await this.usersRepository.query(`select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`);
			if(Object.keys(userInfo).length !== 0)
			{
				let liveGame : LiveGameDto = await this.liveGameServ.getGame(userInfo[0].userName)
				if (Object.keys(liveGame).length !== 0 && (userInfo[0].userName == liveGame[0].player1 || userInfo[0].userName == liveGame[0].player2)){
					console.log("herre")
					this.gamePlaysServ.movingPaddles(playersStat,userInfo[0].userName,body, sockets, liveGame,watchers)
				}
			}
		}
	}

	@SubscribeMessage('startChannels')
	async handleChannels(client : Socket , text: any)
	{
		console.log("--------startChannels-------------")
		let auth_token = client.handshake.auth.Authorization;
		if(auth_token !== "null" && auth_token !== "undefined" && auth_token)
		{
			const tokenInfo : any = this.jwtService.decode(auth_token);
			let userInfo = await this.usersRepository.query(`select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`);
			if(Object.keys(userInfo).length !== 0)
			{
				let test = await this.usersRepository.find({
					relations: ['chatRooms'],
				where: { userName: userInfo[0].userName }
				});
				let rooms : any = test[0].chatRooms;
				if(rooms.length !== 0)
				{
					for(let room of rooms)
					{
						client.join(room.id.toString())
					}
				}
			}
		}
		console.log("--------------------------------")

	}

	@SubscribeMessage('creatChannel')
	async creatChannel(client : Socket , data: any)
	{
		console.log("------creatChannel----------")
		let auth_token = client.handshake.auth.Authorization;
		if(auth_token !== "null" && auth_token !== "undefined" && auth_token)
		{
			const tokenInfo : any = this.jwtService.decode(auth_token);
			let userInfo = await this.usersRepository.query(`select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`);
			if(Object.keys(userInfo).length !== 0)
			{
				let room : any = await this.chatRoomServ.createRoom(userInfo[0].userName,data)
				let sock : Socket[] = []
				let users : Array<any> = data.users
				sock = sockets.get(userInfo[0].userName)
				for(let so of sock)
				{
					so.join(`${room.id}`)
				}
				if(users.length !== 0)
				{
					users.map((e:any) => {
						sock = sockets.get(e.usersName) 
						for(let so of sock)
						{
							so.join(room.id)
						}
					})

				}
			}
		}
		console.log("--------------------------------")
	}
	@SubscribeMessage('roomMessage')
	async handleRoomMessage(client : Socket , data: any)
	{
		let auth_token = client.handshake.auth.Authorization;
		if(auth_token !== "null" && auth_token !== "undefined" && auth_token)
		{
		console.log("------roomMessages----------")

			const tokenInfo : any = this.jwtService.decode(auth_token);
			let userInfo = await this.usersRepository.query(`select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`);
			if(Object.keys(userInfo).length !== 0)
			{
				await this.roomMessageServ.creatRoomMessage(userInfo[0].userName , data)
				let messages = await this.roomMessageServ.getRoomMessages(data.roomId)
				this.server.to(data.roomId).emit("messageRoom" ,  messages)
				// client.emit("messageRoom",messages)
			}
		console.log("--------------------------")
		}
	}


	@SubscribeMessage('addUserToChannel')
	async addUserToChannel(client : Socket , data: any)
	{
		console.log("------addUserToChannel----------")
		let auth_token = client.handshake.auth.Authorization;
		if(auth_token !== "null" && auth_token !== "undefined" && auth_token)
		{
			const tokenInfo : any = this.jwtService.decode(auth_token);
			let userInfo = await this.usersRepository.query(`select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`);
			if(Object.keys(userInfo).length !== 0)
			{
				let sock : Socket[]
				console.log(data.users)
				this.chatRoomServ.addUsersToChannel(data.roomId , data.users)
				if(data.users.length !== 0)
				{
					data.users.map((e:any) => {
						sock = sockets.get(e.usersName) 
						if(sock)
						{
							for(let so of sock)
							{
								so.join(`${data.room.id}`)
							}
						}
					})

				}
			}
		}
		console.log("--------------------------------")
	}


	@SubscribeMessage('notification')
	async handleNotification(client : Socket , data: any)
	{
		console.log("------notifications----------")
		let auth_token = client.handshake.auth.Authorization;
		if(auth_token !== "null" && auth_token !== "undefined" && auth_token)
		{
			const tokenInfo : any = this.jwtService.decode(auth_token);
			let userInfo = await this.usersRepository.query(`select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`);
			if(Object.keys(userInfo).length !== 0)
			{
				let recvSockts : Socket[] = sockets.get(data.reciverName)
				console.log(data)
				// noteData.reciverName = data.reciverName
				// noteData.type = data.type
				// noteData.time = new Date()
				this.notifServ.saveNotification(data,userInfo[0].userName)
				let user : User = await this.usersRepository.findOneBy({userName : userInfo[0].userName}) 
                for(let sock of recvSockts)
                {
                    sock.emit("notification", {user : user , type : data.type})
                }
			}
		}
		console.log("--------------------------------")
	}
/////////////////////////////////////////////
@SubscribeMessage('muteUser')
	async muteUser(client : Socket , data: any)
	{
		console.log("------muteUser----------")
		let auth_token = client.handshake.auth.Authorization;
		if(auth_token !== "null" && auth_token !== "undefined" && auth_token)
		{
			const tokenInfo : any = this.jwtService.decode(auth_token);
			let userInfo = await this.usersRepository.query(`select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`);
			if(Object.keys(userInfo).length !== 0)
			{
				let muteUserInfo :any = await this.roomBannedUserServ.muteUser(data.userName, data.roomId, data.periode)
				let recvSockts : Socket[] = sockets.get(data.userName);
				if(muteUserInfo !== "null")
				{
					for(let sock of recvSockts)
					{
						console.log("mel-hamra Hmaaaaaarr")
						sock.emit("mutedUser", muteUserInfo)
					}
				}
			}
		}
		console.log("--------------------------------")
	}


	@SubscribeMessage('banUser')
	async banUser(client : Socket , data: any)
	{
		console.log("------banUser----------")
		let auth_token = client.handshake.auth.Authorization;
		if(auth_token !== "null" && auth_token !== "undefined" && auth_token)
		{
			const tokenInfo : any = this.jwtService.decode(auth_token);
			let userInfo = await this.usersRepository.query(`select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`);
			if(Object.keys(userInfo).length !== 0)
			{
				let muteUserInfo :any = await this.roomBannedUserServ.banUser(data.userName, data.roomId)
				let recvSockts : Socket[] = sockets.get(data.userName);
				if(muteUserInfo !== "null")
				{
					for(let sock of recvSockts)
					{
						sock.leave(data.roomId.toString())
					}
				}
			}
		}
		console.log("--------------------------------")
	} 
	@SubscribeMessage('kickUser')
	async kickUser(client : Socket , data: any)
	{
		console.log("------kickUser----------")
		let auth_token = client.handshake.auth.Authorization;
		if(auth_token !== "null" && auth_token !== "undefined" && auth_token)
		{
			const tokenInfo : any = this.jwtService.decode(auth_token);
			let userInfo = await this.usersRepository.query(`select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`);
			if(Object.keys(userInfo).length !== 0)
			{
				await this.chatRoomServ.deleteUser(data.roomId , data.userName)
				let kickedSocket : Socket[] = sockets.get(data.userName);
				if(kickedSocket !== null)
				{
					for(let sock of kickedSocket)
					{
						sock.leave(data.roomId.toString())
					}
				}
			}
		}
		console.log("--------------------------------")
	} 

	@SubscribeMessage('changeUserName')
    async changeUserName(client : Socket , data: any)
    {
        console.log("------changeUserName----------")
        let auth_token = client.handshake.auth.Authorization;
        if(auth_token !== "null" && auth_token !== "undefined" && auth_token)
        {
            const tokenInfo : any = this.jwtService.decode(auth_token);
            let userInfo = await this.usersRepository.query(`select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`);
            if(Object.keys(userInfo).length !== 0)
            {
				if((await this.userServ.findUser(userInfo[0].userName,data.userName,userInfo[0].email)) === true)
				{
					let newMap : Map<string,Array<Socket>> = new Map()
					for (let [key, value] of sockets) {
						if(key == userInfo[0].userName)
						{
							newMap.set(data.userName,value)
						}
						else
						newMap.set(key,value)
					}
					sockets=newMap
					console.log(data)
					for (let [key, value] of sockets) {
					    console.log("key: " ,key, "  value: " ,value[0].id )
					}
					this.messageServ.changeName(userInfo[0].userName,data.userName)
					this.chatRoomServ.changeName(userInfo[0].userName,data.userName)
					this.roomMessageServ.changeName(userInfo[0].userName,data.userName)
					this.roomBannedUserServ.changeName(userInfo[0].userName,data.userName)
					this.notifServ.changeName(userInfo[0].userName,data.userName)
				}
            }
        }
        console.log("--------------------------------")
    }
	@SubscribeMessage('Refreche')
	async Refreche(client : Socket , data: any)
	{
		console.log("------Refreche----------")
		let auth_token = client.handshake.auth.Authorization;
		if(auth_token !== "null" && auth_token !== "undefined" && auth_token)
		{
			const tokenInfo : any = this.jwtService.decode(auth_token);
			let userInfo = await this.usersRepository.query(`select "userName" from public."Users" WHERE public."Users".email = '${tokenInfo.userId}'`);
			if(Object.keys(userInfo).length !== 0)
			{
				
			}
		}
		console.log("--------------------------------")
	} 
}