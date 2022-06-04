"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const friendList_entity_1 = require("../entities/friendList.entity");
const friendShip_entity_1 = require("../entities/friendShip.entity");
const typeorm_2 = require("typeorm");
let friendsService = class friendsService {
    constructor(friendListRepo, friendShipRepo, userRepo) {
        this.friendListRepo = friendListRepo;
        this.friendShipRepo = friendShipRepo;
        this.userRepo = userRepo;
    }
    async findAll(userId) {
        var _a;
        console.log(userId[0].id);
        const names = await this.friendListRepo.createQueryBuilder("friends").select("friends.userName").where("friends.userId = :userId", { userId: userId[0].id }).getMany();
        let ret = [];
        for (const element of names) {
            const image = await this.userRepo.query(`select picture from public."Users" WHERE public."Users"."userName" = '${element.userName}'`);
            ret.push({ userName: element.userName, picture: (_a = image[0]) === null || _a === void 0 ? void 0 : _a.picture });
        }
        console.log(ret);
        return ret;
    }
    async sendInv(sender, recipent) {
        const user = await this.userRepo.query(`select * from public."Users" WHERE public."Users"."userName" = '${recipent}'`);
        if (user && sender != recipent) {
            let val = new friendShip_entity_1.FriendShip();
            val.sender_id = sender;
            val.recipent_id = recipent;
            const invExistInbase = await this.userRepo.query(`select * from public."FriendShip" WHERE public."FriendShip"."sender_id" = '${sender}' AND public."FriendShip"."recipent_id" = '${recipent}'`);
            console.log(user, " sender", sender, " recipent", recipent);
            if (invExistInbase.length == 0)
                await this.friendShipRepo.save(val);
        }
    }
    async cancellInv(sender, recipent) {
        let true_user = await this.userRepo.query(`select * from public."Users" WHERE public."Users"."userName" = '${recipent}'`);
        if (true_user != 0) {
            let val = new friendShip_entity_1.FriendShip();
            val.sender_id = sender;
            val.recipent_id = recipent;
            let user = await this.userRepo.query(`select * from public."FriendShip" WHERE public."FriendShip"."sender_id" = '${sender}' AND public."FriendShip"."recipent_id" = '${recipent}'`);
            if (user.length == 0) {
                val.sender_id = recipent;
                val.recipent_id = sender;
                user = await this.userRepo.query(`select * from public."FriendShip" WHERE public."FriendShip"."sender_id" = '${recipent}' AND public."FriendShip"."recipent_id" = '${sender}'`);
            }
            if (user.length != 0) {
                console.log(user);
                await this.friendShipRepo.delete(val);
            }
        }
    }
    async acceptFriend(Cuser, sender_id, id) {
        const user = await this.userRepo.query(`select * from public."FriendShip" WHERE public."FriendShip"."sender_id" = '${sender_id}' AND public."FriendShip"."recipent_id" = '${Cuser}'`);
        if (user.length != 0) {
            let val = this.friendListRepo.create();
            val.userName = sender_id;
            val.user = id;
            await this.friendListRepo.save(val);
        }
        await this.friendShipRepo.query(`DELETE FROM public."FriendShip" WHERE sender_id='${sender_id}' and recipent_id='${Cuser}'`);
    }
    async rejectFriend(Cuser, recipent, id) {
        const user = await this.userRepo.query(`select * from public."Users" WHERE public."Users"."userName" = '${recipent}'`);
        if (user) {
            let val = new friendShip_entity_1.FriendShip();
            val.sender_id = Cuser;
            val.recipent_id = recipent;
            const user = await this.userRepo.query(`select * from public."FriendShip" WHERE public."FriendShip"."sender_id" = '${Cuser}' AND public."FriendShip"."recipent_id" = '${recipent}'`);
            if (user.length != 0) {
                await this.friendShipRepo.delete(val);
            }
        }
    }
    async users(userName, userId) {
        const user_rinvite = await this.userRepo.query(` select public."Users"."userName", public."Users"."picture" FROM public."Users" where public."Users"."userName" in \
		( select  public."FriendShip"."sender_id" from  public."FriendShip" WHERE public."FriendShip"."recipent_id" = '${userName}'
		)`);
        const user_sinvite = await this.userRepo.query(`select public."Users"."userName", public."Users"."picture" FROM public."Users" where public."Users"."userName" in \
		( select public."FriendShip"."recipent_id" from  public."FriendShip" WHERE public."FriendShip"."sender_id" = '${userName}') `);
        const user_friends = await this.userRepo.query(`select public."Users"."userName", public."Users"."picture" FROM public."Users" where public."Users"."userName" in ( SELECT  "userName" FROM public."FriendLsit" WHERE "userId" = '${userId}') OR public."Users"."userName" in ( SELECT  "userName" FROM public."Users" WHERE   "id" in (select "userId" from public."FriendLsit" WHERE "userName" = '${userName}'))`);
        console.log(user_friends);
        console.log(userId);
        let blocked_friends = await this.userRepo.query(`select public."Users"."userName", public."Users"."picture"  FROM public."Users" \
        WHERE  public."Users"."userName" = \
        (select "userName" FROM public."FriendBlocked" WHERE public."FriendBlocked"."userId" = '${userId}') \
        OR \
        public."Users"."userName" = (select "userName" FROM public."Users" WHERE public."Users"."id"=(select "userId" FROM public."FriendBlocked" WHERE public."FriendBlocked"."userName" = '${userName}')) \
        `);
        const all_users = await this.userRepo.query(`select public."Users"."userName", public."Users"."picture"  FROM public."Users" \
		WHERE  public."Users"."userName" NOT IN (select "userName" FROM public."FriendBlocked" WHERE public."FriendBlocked"."userId" = '${userId}')`);
        const ret = { all_users, user_rinvite, user_friends, user_sinvite, blocked_friends };
        return ret;
    }
    async friendStatus(userName) {
        let friend;
        let pending;
        let obj = {
            friend: 'false',
            pending: 'false',
        };
        friend = await this.friendListRepo.findOne({ userName: userName });
        if (friend)
            obj.friend = 'true';
        if (!friend)
            pending = await this.friendShipRepo.findOne({ sender_id: userName });
        if (pending && !friend)
            obj.pending = 'true';
        if (!pending && !friend)
            pending = await this.friendShipRepo.findOne({ recipent_id: userName });
        if (pending && !friend)
            obj.pending = 'true';
        console.log(obj);
        return obj;
    }
};
friendsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(friendList_entity_1.FriendLsit)),
    __param(1, (0, typeorm_1.InjectRepository)(friendShip_entity_1.FriendShip)),
    __param(2, (0, typeorm_1.InjectRepository)(friendList_entity_1.FriendLsit)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], friendsService);
exports.friendsService = friendsService;
//# sourceMappingURL=friends.service.js.map