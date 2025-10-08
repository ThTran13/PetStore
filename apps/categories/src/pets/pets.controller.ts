import { Body, Controller, Delete, Get, Param, Patch, Post, } from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Controller('pet')
export class PetsController {
  constructor(private readonly petService: PetsService) {}

  @Post()
  async createPet(@Body() createPetDto: CreatePetDto) {
    return this.petService.create(createPetDto);
  }

  @Get()
  async getAllPets() {
    return this.petService.findAll();
  }

  @Get('count')
  async countPets() {
    return this.petService.count();
  }

  @Get(':id')
  async getPetById(@Param('id') id: number) {
    return this.petService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePetDto: UpdatePetDto,
  ) {
    return this.petService.update(+id, updatePetDto);
  }

   @Delete(':id')
   async remove(@Param('id') id: string) {
     return this.petService.remove(+id);
   }

}
