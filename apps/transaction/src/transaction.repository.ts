import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { TransactionEntity } from "./models/transaction.entity";

@Injectable()
export class TransactionRepository extends AbstractRepository<TransactionEntity> {
    protected readonly logger = new Logger(TransactionRepository.name);

    constructor(
        @InjectRepository(TransactionEntity)
        transactionRepository: Repository<TransactionEntity>,
        entityManager: EntityManager,
    ) {
        super(transactionRepository, entityManager);
    }

}