import { AbstractEntity } from "@app/common";
import { Column, Entity } from "typeorm";

@Entity()
export class Product extends AbstractEntity<Product> {
    @Column()
    cost: number;

    @Column()
    name: string;

    @Column()
    madeIn: string;

    @Column()
    belongTo: string;

    constructor(entity?: { cost: number, name: string, madeIn: string, belongTo: string }) {
        super(entity);

        if (entity) {
            this.cost = entity.cost;
            this.name = entity.name;
            this.madeIn = entity.madeIn;
            this.belongTo = entity.belongTo;
        }
    }
}