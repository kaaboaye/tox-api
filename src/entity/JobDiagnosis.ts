import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import 'reflect-metadata';
import { IsEnum } from "class-validator";
import { Person } from "./Person";
import { JobRepairType } from "./Job";

@Entity()
export class JobDiagnosis extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => JobDiagnosis)
    @JoinColumn({
        name: 'prevId'
    })
    prev: JobDiagnosis;

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
        type: 'text'
    })
    diagnosis: string;

    /////////

    @Column({
        type: 'float4',
        nullable: true
    })
    hydraulicNominalDimension: number;

    @Column({
        type: 'float4',
        nullable: true
    })
    th01: number;

    @Column({
        type: 'float4',
        nullable: true
    })
    th02: number;

    @Column({
        type: 'float4',
        nullable: true
    })
    th03: number;

    @Column({
        type: 'float4',
        nullable: true
    })
    th91: number;

    @Column({
        type: 'float4',
        nullable: true
    })
    th92: number;

    @Column({
        type: 'float4',
        nullable: true
    })
    th93: number;

    /////////

    @Column({
        type: 'float4',
        nullable: true
    })
    pneumaticNominalDimension: number;

    @Column({
        type: 'float4',
        nullable: true
    })
    tp01: number;

    @Column({
        type: 'float4',
        nullable: true
    })
    tp02: number;

    @Column({
        type: 'float4',
        nullable: true
    })
    tp03: number;

    @Column({
        type: 'float4',
        nullable: true
    })
    tp91: number;

    @Column({
        type: 'float4',
        nullable: true
    })
    tp92: number;

    @Column({
        type: 'float4',
        nullable: true
    })
    tp93: number;

    /////////

    @Column({
        type: 'float4',
        nullable: true
    })
    plungerNominalDimension: number;

    @Column({
        type: 'float4',
        nullable: true
    })
    n01: number;

    @Column({
        type: 'float4',
        nullable: true
    })
    n02: number;

    @Column({
        type: 'float4',
        nullable: true
    })
    n03: number;

    @Column({
        type: 'float4',
        nullable: true
    })
    n91: number;

    @Column({
        type: 'float4',
        nullable: true
    })
    n92: number;

    @Column({
        type: 'float4',
        nullable: true
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
