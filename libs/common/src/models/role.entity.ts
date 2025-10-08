import { Column, Entity } from "typeorm";
import { AbstractEntity } from "../database";

@Entity()
export class Role extends AbstractEntity<Role> {
    @Column()
    name: string;

    constructor(entity?: { name: string }) {
        super(entity);

        if (entity) {
            this.name = entity.name;
        }
    }
}