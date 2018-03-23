import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { Client } from "./Client";
import { Person } from "./Person";
import { Device } from "./Device";
import { EventRegistration } from "./EventRegistration";

export enum EventRegistrationType {
    PostWarranty,
    Warranty
}

export enum EventRepairType {
    Free,
    Paid
}

@Entity()
export class Event extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Client, client => client.id)
    client: Client;

    @ManyToOne(type => Person, applicant => applicant.id)
    applicant: Person;

    @ManyToOne(type => Person, dispatcher => dispatcher.id)
    dispatcher: Person;

    @ManyToOne(type => Device, device => device.id)
    device: Device;

    @OneToOne(type => EventRegistration)
    @JoinColumn()
    registration: EventRegistration;

    @Column({
        type: 'timestamp',
        default: 'NOW()'
    })
    createdAt: Date;
}