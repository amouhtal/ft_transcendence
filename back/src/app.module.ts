import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { chatRoomModule } from './chatRoom/chatRoom.module';
import { UploadModule } from './fileUpload/file-upload.module';
import { FriendsModule } from './friends/friends.module';
import { gameModule } from './games/game.module';
import { GateWayModule } from './gateways/gateway.module';
import { MessageModule } from './messages/message.module';
import { TwoFaModule } from './twofactor/twoFactorAuthentication.module';
import { typeOrmConfig } from './typeormcofig';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule,chatRoomModule,MessageModule,TwoFaModule, gameModule, AuthModule ,UploadModule, FriendsModule ,GateWayModule ,TypeOrmModule.forRoot(typeOrmConfig),
 ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
