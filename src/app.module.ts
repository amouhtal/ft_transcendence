import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FriendsModule } from './friends/friends.module';
import { gameModule } from './games/game.module';
import { typeOrmConfig } from './typeormcofig';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [UserModule, gameModule, AuthModule , FriendsModule , MailModule ,TypeOrmModule.forRoot(typeOrmConfig), JwtModule.register({ secret: 'bda1843e3fa6f42e528dd2ec9f088a1d4b181d525faa9caaf65c9b3ca978ef54' }), MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
