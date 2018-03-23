import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";
import 'reflect-metadata';
import { IsAlphanumeric, Length } from "class-validator";
import { Person } from "./Person";
import { User } from "./User";
import { randomBytes } from "crypto";

@Entity()
export class Session extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @ManyToOne(type => User, user => user.id, {
        nullable: false
    })
    user: User;

    @Column()
    ip: string;

    @Column()
    userAgent: string;

    @Column({
        type: 'timestamp'
    })
    expireAt: Date;

    @Column({
        default: false
    })
    revoked: boolean;

    @Column({
        type: 'timestamp',
        default: 'NOW()'
    })
    createdAt: Date;

    // Methods

    async SetToken(): Promise<void> {
        this.token = await randomBytes(64).toString('base64');
    }
}