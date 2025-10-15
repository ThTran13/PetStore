import { Inject, Injectable } from '@nestjs/common';
import { TransactionRepository } from './transaction.repository';
import { ClientProxy } from '@nestjs/microservices';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { forkJoin, from, map, switchMap } from 'rxjs';
import { Orders } from './models/orders.entity';
import { TransactionEntity } from './models/transaction.entity';
import { CATEGORY_SERVICE, CUSTOMER_SERVICE } from '@app/common';
import { GetTransactionDto } from './dto/get-transaction.dto';
import { GetOrderDto } from './dto/get-orders.dto';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    @Inject(CATEGORY_SERVICE) private readonly categoriesService: ClientProxy,
  ) { }

  create(createTransactionDto: CreateTransactionDto) {
    const orderDetails = forkJoin(
      createTransactionDto.orderItems.map(order =>
        this.getItemDetails(order.itemId, order.itemType).pipe(
          map(itemDetails => ({
            ...order,
            name: itemDetails.name,
            price: itemDetails.cost,
          }))
        )
      )
    );

    return orderDetails.pipe(
      map(orders => {
        const orderEntities = orders.map(order => new Orders(order));

        const totalAmount = createTransactionDto.totalAmount ||
          this.calculateTotalAmount(orderEntities);

        const transaction = new TransactionEntity({
          customerId: createTransactionDto.customerId,
          totalAmount,
          status: createTransactionDto.status || 'pending',
          transactionDate: createTransactionDto.transactionDate || new Date(),
          order: orderEntities,
        });
        return transaction;
      }),
      switchMap(transaction =>
        from(this.transactionRepository.create(transaction))
      )
    );
  }

  async getAllTransactions(): Promise<GetTransactionDto[]> {
    const transactions = await this.transactionRepository.find({});
    return transactions.map((transaction: TransactionEntity) => ({
      id: transaction.id,
      customerId: transaction.customerId,
      orderItems: transaction.order.map(order => ({
        itemId: order.itemId,
        name: order.name,
        price: order.price,
        itemType: order.itemType,
        quantity: order.quantity,
      }) as GetOrderDto),
      totalAmount: transaction.totalAmount,
      status: transaction.status,
      transactionDate: transaction.transactionDate,
    }));
  }

  private getItemDetails(itemId: number, itemType: string) {
    const pattern = itemType === 'pet' ? 'get_pet_by_id' : 'get_product_by_id';

    return this.categoriesService.send(pattern, itemId).pipe(
      map(itemDetails => {
        if (!itemDetails) {
          throw new Error(`${itemType} with id ${itemId} not found`);
        }
        return {
          name: itemDetails.name,
          cost: itemDetails.cost,
        };
      })
    );
  }

  private calculateTotalAmount(orders: Orders[]): number {
    return orders.reduce((total, order) => {
      return total + (order.price * order.quantity);
    }, 0);
  }

}