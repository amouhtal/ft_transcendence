import { sign } from 'jsonwebtoken';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class RefreshToken {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;


  @Column()
  userAgent: string;

  @Column()
  ipAddress: string;

  sign(): string {
    return sign({ ...this }, process.env.REFRESH_SECRET);
  }
}