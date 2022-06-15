// import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
// import { sign } from 'jsonwebtoken';

// @Entity('RefreshToken')
// export class RefreshToken2  {
//     constructor(init?: Partial<RefreshToken2>) {
//     Object.assign(this, init);
//   }
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({unique : true})
//   userName: string;

//   @Column()
//   userAgent: string;

//   @Column()
//   ipAddress: string;

//   sign(): string {
//     return sign({ ...this }, process.env.REFRESH_SECRET);
//   }
// }