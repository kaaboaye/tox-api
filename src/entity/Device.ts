import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";
import 'reflect-metadata';
import { Job } from "./Job";
import { Client } from "./Client";

@Entity()
export class Device extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    denotement: string;

    @Column()
    serialNumber: string;

    @ManyToOne(type => Client, owner => owner.id)
    owner: Client;

    // Relations

    @OneToMany(type => Job, events => events.id)
    events: Job[];
}