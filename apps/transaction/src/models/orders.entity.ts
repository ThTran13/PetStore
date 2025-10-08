import { AbstractEntity } from "@app/common";
import { ItemType } from "./item-types.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { TransactionEntity } from "./transaction.entity";

@Entity()
export class Orders extends AbstractEntity<Orders> {
  @Column()
  itemId: number;

  @Column('varchar')
  itemType: ItemType;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  quantity: number;
  
  @ManyToOne(() => TransactionEntity, transaction => transaction.order)
  transaction: TransactionEntity;

  constructor(entity?: {
    itemId: number;
    itemType: ItemType;
    name: string;
    price: number;
    quantity: number;
    
  }) {
    super(entity);
    if (entity) {
      this.itemId = entity.itemId;
      this.itemType = entity.itemType;
      this.name = entity.name;
      this.price = entity.price;
      this.quantity = entity.quantity;
    }
  }
}