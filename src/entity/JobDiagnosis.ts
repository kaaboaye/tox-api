import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";
import 'reflect-metadata';
import { IsEnum } from "class-validator";
import { Person } from "./Person";
import { JobRepairType } from "./Job";

@Entity()
export class JobDiagnosis extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => JobDiagnosis)
    @JoinColumn()
    prev: JobDiagnosis;

    @Column({
        type: 'timestamp',
        default: 'NOW()'
    })
    createdAt: Date;

    @Column({
        type: 'text'
    })
    diagnosis: string;

    /////////

    @Column({
        type: 'float4'
    })
    hydraulicNominalDimension: number;

    @Column({
        type: 'float4'
    })
    th01: number;

    @Column({
        type: 'float4'
    })
    th02: number;

    @Column({
        type: 'float4'
    })
    th03: number;

    @Column({
        type: 'float4'
    })
    th91: number;

    @Column({
        type: 'float4'
    })
    th92: number;

    @Column({
        type: 'float4'
    })
    th93: number;

    /////////

    @Column({
        type: 'float4'
    })
    pneumaticNominalDimension: number;

    @Column({
        type: 'float4'
    })
    tp01: number;

    @Column({
        type: 'float4'
    })
    tp02: number;

    @Column({
        type: 'float4'
    })
    tp03: number;

    @Column({
        type: 'float4'
    })
    tp91: number;

    @Column({
        type: 'float4'
    })
    tp92: number;

    @Column({
        type: 'float4'
    })
    tp93: number;

    /////////

    @Column({
        type: 'float4'
    })
    plungerNominalDimension: number;

    @Column({
        type: 'float4'
    })
    n01: number;

    @Column({
        type: 'float4'
    })
    n02: number;

    @Column({
        type: 'float4'
    })
    n03: number;

    @Column({
        type: 'float4'
    })
    n91: number;

    @Column({
        type: 'float4'
    })
    n92: number;

    @Column({
        type: 'float4'
    })
    n93: number;

    //////////

    @Column({
        type: 'text'
    })
    partsToReplace: string;

    @Column()
    estimatedRepairTime: string;

    @Column({
        type: 'timestamp'
    })
    expertiseDate: Date;

    @ManyToOne(type => Person, serviceman => serviceman.id)
    serviceman: Person;

    @Column()
    @IsEnum(JobRepairType)
    repairType: JobRepairType;
}