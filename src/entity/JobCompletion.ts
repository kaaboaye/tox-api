import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { Person } from "./Person";

@Entity()
export class JobCompletion extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => JobCompletion)
    prev: JobCompletion;

    @Column({
        type: 'timestamp',
        default: 'NOW()'
    })
    createdAt: Date;

    @Column({
        type: 'timestamp'
    })
    date: Date;

    @Column({
        type: 'text'
    })
    description: string;

    @Column()
    repairTime: string;

    @Column({
        type: 'text'
    })
    annotations: string;

    @ManyToOne(type => Person, serviceman => serviceman.id)
    serviceman: Person;
}