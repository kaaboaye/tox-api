import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";
import 'reflect-metadata';
import { IsEnum } from "class-validator";
import { EventRegistrationType } from "./Event";

export interface EventRegistrationUpdate {
    type?: EventRegistration;
    placeOfRealisation?: string;
    description?: string;
}

@Entity()
export class EventRegistration extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    // Linked list
    @OneToOne(type => EventRegistration)
    prev: EventRegistration;

    @Column({
        type: 'timestamp',
        default: 'NOW()'
    })
    createdAt: Date;

    @Column()
    @IsEnum(EventRegistrationType)
    type: EventRegistrationType;

    @Column()
    placeOfRealisation: string;

    @Column({
        type: 'text'
    })
    description: string;
}