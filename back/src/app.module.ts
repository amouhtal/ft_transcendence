import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './fileUpload/file-upload.module';
import { FriendsModule } from './friends/friends.module';
import { gameModule } from './games/game.module';
import { TwoFaModule } from './twofactor/twoFactorAuthentication.module';
import { typeOrmConfig } from './typeormcofig';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule,TwoFaModule, gameModule, AuthModule ,UploadModule, FriendsModule  ,TypeOrmModule.forRoot(typeOrmConfig),
 ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
