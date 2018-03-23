import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { IsAlpha, Length } from "class-validator";
import { Person } from "./Person";

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
}