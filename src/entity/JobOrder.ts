import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";

@Entity()
export class JobOrder extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => JobOrder)
    @JoinColumn()
    prev: JobOrder;

    @Column({
        type: 'timestamp',
        default: 'NOW()'
    })
    createdAt: Date;

    @Column()
    numberSAP: string;

    @Column()
    purchaseOrder: string;

    @Column()
    clientsOrder: string;
}