import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinColumn, OneToOne } from "typeorm";

export interface EventClosureUpdate {
    dateOfDispatch?: Date;
    annotations?: string;
    dateOfClosure?: Date;
}

@Entity()
export class JobClosure extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => JobClosure)
    @JoinColumn({
        name: 'prevId'
    })
    prev: JobClosure;

    @Column({
        nullable: true
    })
    prevId: number;

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
