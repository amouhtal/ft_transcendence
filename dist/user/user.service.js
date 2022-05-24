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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
let UserService = class UserService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async setTwoFactorAuthenticationSecret(secret, email) {
        let id = await this.usersRepository.query(`select id from public."Users" WHERE public."Users"."email" = '${email}'`);
        return this.usersRepository.update(id, {
            twoFactorAuthenticationSecret: secret
        });
    }
    async turnOnTwoFactorAuthentication(email) {
        let id;
        try {
            id = await this.usersRepository.findOne({ email: email });
        }
        catch (e) {
            console.log("from here");
        }
        await this.usersRepository.update(id.id, {
            isTwoFactorAuthenticationEnabled: true
        });
    }
    async InsertUser(userDto) {
        try {
            const userData = await this.usersRepository.createQueryBuilder().insert().into('Users').values(userDto).onConflict('("id") DO NOTHING').execute();
        }
        catch (_a) {
            return "Message Receiver!";
        }
    }
    async findAll() {
        return await this.usersRepository.query(`select * from Users`);
    }
    async findUser(request, email) {
        const user = await this.usersRepository.createQueryBuilder().select("user").from(user_entity_1.User, "user").where("user.userName = :name", { name: request.userName }).getOne();
        console.log(email, "doesnt exist");
        if (user == null) {
            await this.usersRepository.createQueryBuilder()
                .update(user_entity_1.User)
                .set({ userName: request.userName })
                .where("email = :email", { email: email })
                .execute();
        }
        if (user == null) {
            return true;
        }
        return false;
    }
    async findByemail(email) {
        return this.usersRepository.findOne({ email: email });
    }
    async updateActive(stats, userName) {
        var get = await this.usersRepository.query(`UPDATE public."Users" SET "isActive"= '${stats}' WHERE  "userName"= '${userName}'`);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map