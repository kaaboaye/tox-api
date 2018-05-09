import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany, OneToOne, getConnection } from "typeorm";
import 'reflect-metadata';
import { IsAlphanumeric, IsEnum, Length } from "class-validator";
import { Person } from "./Person";
import { Session } from "./Session";
import { Config } from "../Config";
import { compare, hash } from "bcrypt";

export enum UserRank {
    Serviceman,
    Manager,
    Admin
}

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(3)
    @IsAlphanumeric()
    username: string;

    @Column()
    password: string;

    @Column({
        default: UserRank.Serviceman
    })
    @IsEnum(UserRank)
    rank: UserRank;

    @OneToOne(type => Person, {
        nullable: false
    })
    @JoinColumn()
    identity: Person;

    // Relations

    @OneToMany(type => Session, session => session.id)
    sessions: Session[];

    // Methods

    async SetPassword(pass: string): Promise<void> {
        this.password = await User.CalcHash(pass);
    }

    async UpdatePassword(pass: string): Promise<void> {
        await getConnection()
            .createQueryBuilder()
            .update(User)
            .set({
                password: await User.CalcHash(pass)
            })
            .where({
                id: this.id
            })
            .execute();
    }

    static async CalcHash(pass: string): Promise<string> {
        return await hash(pass, Config.SaltRounds);
    }

    async CheckPassword(pass: string): Promise<boolean> {
        return await compare(pass, this.password);
    }
}