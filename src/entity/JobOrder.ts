import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class JobOrder extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => JobOrder)
    @JoinColumn({
        name: 'prevId'
    })
    prev: JobOrder;

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
    numberSAP: string;

    @Column()
    purchaseOrder: string;

    @Column()
    clientsOrder: string;
}
