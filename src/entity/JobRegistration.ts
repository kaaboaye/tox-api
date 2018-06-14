import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinColumn, OneToOne } from "typeorm";
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
    @JoinColumn({
        name: 'prevId'
    })
    prev: JobRegistration;

    @Column({
        nullable: true
    })
    prevId: number;

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
