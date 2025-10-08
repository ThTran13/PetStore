import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { Customers } from "./dto/customers.entity";

@Injectable()
export class CustomersRepository extends AbstractRepository<Customers> {
    protected readonly logger = new Logger(CustomersRepository.name);

    constructor(
        @InjectRepository(Customers)
        petRepository: Repository<Customers>,
        entityManager: EntityManager,
    ) {
        super(petRepository, entityManager);
    }
}