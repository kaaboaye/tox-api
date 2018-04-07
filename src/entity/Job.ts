import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { Client } from "./Client";
import { Person } from "./Person";
import { Device } from "./Device";
import { JobRegistration } from "./JobRegistration";
import { IsEnum } from "class-validator";

export enum JobRegistrationType {
    PostWarranty,
    Warranty
}

export enum JobRepairType {
    Free,
    Paid
}

export enum JobState {
    Registered,
    Diagnosed,
    Ordered,
    Finished,
    Closed,
    Deleted
}

@Entity()
export class Job extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsEnum(JobState)
    state: JobState;

    @ManyToOne(type => Client, client => client.id, {
        nullable: false
    })
    client: Client;

    @ManyToOne(type => Person, applicant => applicant.id, {
        nullable: false
    })
    applicant: Person;

    @ManyToOne(type => Person, dispatcher => dispatcher.id, {
        nullable: false
    })
    dispatcher: Person;

    @ManyToOne(type => Device, device => device.id, {
        nullable: false
    })
    device: Device;

    @OneToOne(type => JobRegistration)
    @JoinColumn()
    registration: JobRegistration;

    @Column({
        type: 'timestamp',
        default: 'NOW()'
    })
    createdAt: Date;
}