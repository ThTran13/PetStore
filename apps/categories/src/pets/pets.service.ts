import { Injectable, NotFoundException } from '@nestjs/common';
import { PetRepository } from './pets.repository';
import { CreatePetDto } from './dto/create-pet.dto';
import { Pet } from '@app/common';
import { UpdatePetDto } from './dto/update-pet.dto';

@Injectable()
export class PetsService {
  constructor(private readonly petRepository: PetRepository) { }

  async create(createPetDto: CreatePetDto) {
    const pet = new Pet({
      ...createPetDto
    })

    return await this.petRepository.create(pet);
  }

  async findAll() {
    return this.petRepository.findAll();
  }

  async count() {
    return this.petRepository.count();
  }

  async findOne(id: number) {
    return this.petRepository.findOne({ id });
  }


  update(id: number, updatePetDto: UpdatePetDto) {
    return this.petRepository.findOneAndUpdate(
      { id },
      updatePetDto,
    );
  }

  remove(id: number) {
    return this.petRepository.findOneAndDelete({ id });
  }

}
