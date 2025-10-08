import { Module } from '@nestjs/common';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { DatabaseModule } from '@app/common';
import { Pet } from '@app/common';
import { PetRepository } from './pets.repository';

@Module({
  imports: [DatabaseModule,
    DatabaseModule.forFeature([Pet]),
  ],
  controllers: [PetsController],
  providers: [PetsService, PetRepository],
  exports: [PetsService],
})

export class PetsModule {}
