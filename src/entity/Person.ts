import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import 'reflect-metadata';
import { IsAlpha, IsEmail, IsMobilePhone, Length } from "class-validator";
import { Client } from "./Client";

@Entity()
export class Person extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(3)
    @IsAlpha()
    firstName: string;

    @Column()
    @Length(3)
    @IsAlpha()
    lastName: string;

    @Column({
        unique: true
    })
    @IsEmail()
    email: string;

    @Column({
        length: 20
    })
    @IsMobilePhone('en-US')
    phoneNumber: string;

    // Relations

    // If this relation is NULL we assume that this person works in ToxPL
    @ManyToOne(type => Client, client => client.id)
    client: Client;
}
