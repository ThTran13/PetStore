import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { Pet } from "@app/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

@Injectable()
export class PetRepository extends AbstractRepository<Pet> {
    protected readonly logger = new Logger(PetRepository.name);

    constructor(
        @InjectRepository(Pet)
        petRepository: Repository<Pet>,
        entityManager: EntityManager,
    ) {
        super(petRepository, entityManager);
    }
}