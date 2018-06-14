import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { IsAlpha } from "class-validator";
import { Person } from "./Person";
import { Device } from "./Device";

@Entity()
export class Client extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsAlpha()
    name: string;

    @Column()
    @IsAlpha()
    street: string;

    @Column()
    @IsAlpha()
    postalCode: string;

    @Column()
    @IsAlpha()
    city: string;

    // Relations

    @OneToMany(type => Person, people => people.id)
    staff: Person[];

    @OneToMany(type => Device, device => device.id)
    devices: Device[];
}
