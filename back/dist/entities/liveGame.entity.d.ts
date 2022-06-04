import { User } from './user.entity';
export declare class liveGame {
    id: number;
    player1: string;
    player2: string;
    time: Date;
    watchers: User[];
}
