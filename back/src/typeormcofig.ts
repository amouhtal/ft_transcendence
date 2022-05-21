import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { RefreshToken } from './auth/entities/refresh-token.entity';
import { FriendBlocked, FriendLsit } from './entities/friendList.entity';
import { FriendShip } from './entities/friendShip.entity';
import { Games } from './entities/game.entity';
import { User } from './entities/user.entity';

// ['**/*.entity{.ts,.js}']

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'trans',
  entities: [User, Games, RefreshToken, FriendLsit, FriendShip, FriendBlocked],
  synchronize: true,
};
