import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";
import 'reflect-metadata';
import { Event } from "./Event";

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

    // Relations

    @OneToMany(type => Event, events => events.id)
    events: Event[];
}