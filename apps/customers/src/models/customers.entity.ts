import { AbstractEntity } from "@app/common";
import { Column, Entity } from "typeorm";

@Entity()
export class Customers extends AbstractEntity<Customers> {
    @Column()
    address: number;

    @Column()
    name: string;

    @Column()
    phoneNum: number;

    constructor(entity?: { address: number, name: string, phoneNum: number}) {
        super(entity);
        if (entity) {
            this.address = entity.address;
            this.name = entity.name;
            this.phoneNum = entity.phoneNum;
        }
    }
}