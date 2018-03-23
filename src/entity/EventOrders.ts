import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";

@Entity()
export class EventOrders extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => EventOrders)
    @JoinColumn()
    prev: EventOrders;

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