import { AbstractEntity } from "@app/common";
import { Column, Entity } from "typeorm";

@Entity()
export class Pet extends AbstractEntity<Pet> {
    @Column()
    cost: number;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    breed: string;

    constructor(entity?: { cost: number, name: string, age: number, breed: string }) {
        super(entity);

        if (entity) {
            this.cost = entity.cost;
            this.name = entity.name;
            this.age = entity.age;
            this.breed = entity.breed;
        }
    }
}