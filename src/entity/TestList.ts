import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinColumn, OneToOne } from "typeorm";

export interface TestListUpdate {
    text?: string;
}

@Entity()
export class TestList extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => TestList)
    @JoinColumn()
    prev: TestList;

    @Column()
    text: string;

    @Column({
        type: 'timestamp',
        default: 'NOW()'
    })
    createdAt: Date;

    // Methods

    async Update(changes: TestListUpdate): Promise<void> {
        // Pull relation if needed
        if (!this.prev) {
            const tmp = await TestList.findOneById(this.id, {
                relations: ['prev']
            });

            this.prev = tmp.prev;
        }

        // Save previous value
        const prev = new TestList();
        prev.prev = this.prev;
        prev.createdAt = this.createdAt;

        prev.text = this.text;

        await prev.save();

        // Save current value
        if (changes.text) {
            this.text = changes.text;
        }

        this.prev = prev;
        this.createdAt = new Date();
        await this.save();
    }

    async History(): Promise<TestList[]> {
        console.log(this.prev);

        // Pull relation if needed
        if (!this.prev) {
            console.log('here');
            const tmp = await TestList.findOneById(this.id, {
                relations: ['prev']
            });

            this.prev = tmp.prev;
        }

        if (!this.prev) {
            console.log('ina');
            return [this];
        }

        const arr: TestList[] = [];
        let item: TestList = this;
        let prev: TestList = this.prev;

        this.prev = undefined;
        arr.push(this);

        while (prev) {
            item = await TestList.findOneById(prev.id, {
                relations: ['prev']
            });

            prev = item.prev;
            item.prev = undefined;

            arr.push(item);
        }

        return arr;
    }
}
