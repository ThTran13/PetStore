import { AbstractEntity } from "@app/common";
import { Column, Entity } from "typeorm";

@Entity()
export class Category extends AbstractEntity<Category> {
    @Column()
    name: string; 

    @Column()
    totalItems: number;

    @Column() 
    items: any[];

    constructor(entity?: { name: string; totalItems: number; items: any[] }) {
        super(entity);
        if (entity) {
            this.name = entity.name;
            this.totalItems = entity.totalItems;
            this.items = entity.items;
        }
    }
}