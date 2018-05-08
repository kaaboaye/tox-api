import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";
import 'reflect-metadata';
import { IsEnum } from "class-validator";
import { JobRegistrationType } from "./Job";

export interface EventRegistrationUpdate {
    type?: JobRegistration;
    placeOfRealisation?: string;
    description?: string;
}

@Entity()
export class JobRegistration extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    // Linked list
    @OneToOne(type => JobRegistration)
    @JoinColumn()
    prev: JobRegistration;

    @Column({
        type: 'timestamp',
        default: 'NOW()'
    })
    createdAt: Date;

    @Column()
    @IsEnum(JobRegistrationType)
    type: JobRegistrationType;

    @Column()
    placeOfRealisation: string;

    @Column({
        type: 'text'
    })
    description: string;
}