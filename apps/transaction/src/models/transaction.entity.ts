import { AbstractEntity } from "@app/common";
import { Column, Entity, OneToMany } from "typeorm";
import { Orders } from "./orders.entity";

@Entity()
export class TransactionEntity extends AbstractEntity<TransactionEntity> {
    @Column()
    customerId: number;

    @OneToMany(() => Orders, order => order.transaction, { cascade: true, eager: true })
    order: Orders[];

    @Column()
    totalAmount: number;

    @Column()
    status: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    transactionDate: Date;

    constructor(entity?: {
        customerId: number;
        order: Orders[];
        totalAmount: number;
        status?: string;
        transactionDate?: Date;
    }) {
        super(entity);
        if (entity) {
            this.customerId = entity.customerId;
            this.order = entity.order;
            this.totalAmount = entity.totalAmount;
            this.status = entity.status || 'pending';
            this.transactionDate = entity.transactionDate || new Date();
        }
    }
}