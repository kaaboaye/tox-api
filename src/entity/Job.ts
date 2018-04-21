import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { Client } from "./Client";
import { Person } from "./Person";
import { Device } from "./Device";
import { JobRegistration } from "./JobRegistration";
import { IsEnum } from "class-validator";
import { JobDiagnosis } from "./JobDiagnosis";
import { JobOrder } from "./JobOrder";
import { JobCompletion } from "./JobCompletion";

export enum JobRegistrationType {
    PostWarranty,
    Warranty
}

export enum JobRepairType {
    Free,
    Paid
}

export enum JobState {
    Created,
    Registered,
    Diagnosed,
    Ordered,
    Finished,
    Closed,
    Deleted
}

export const JobExtendedRelations = [
    'client',
    'applicant',
    'dispatcher',
    'device',
    'registration',
    'diagnosis',
    'diagnosis.serviceman',
    'order',
    'completion',
    'completion.serviceman'
];

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

    @OneToOne(type => JobDiagnosis)
    @JoinColumn()
    diagnosis: JobDiagnosis;

    @OneToOne(type => JobOrder)
    @JoinColumn()
    order: JobOrder;

    @OneToOne(type => JobCompletion)
    @JoinColumn()
    completion: JobCompletion;

    @Column({
        type: 'timestamp',
        default: 'NOW()'
    })
    createdAt: Date;
}