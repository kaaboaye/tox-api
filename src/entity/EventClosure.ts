import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";

export interface EventClosureUpdate {
    dateOfDispatch?: Date;
    annotations?: string;
    dateOfClosure?: Date;
}

@Entity()
export class EventClosure extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => EventClosure)
    @JoinColumn()
    prev: EventClosure;

    @Column({
        type: 'timestamp',
        default: 'NOW()'
    })
    createdAt: Date;

    @Column({
        type: 'timestamp'
    })
    dateOfDispatch: Date;

    @Column({
        type: 'text'
    })
    annotations: string;

    @Column({
        type: 'timestamp'
    })
    dateOfClosure: Date;
}