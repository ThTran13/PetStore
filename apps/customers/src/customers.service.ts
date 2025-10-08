import { Injectable } from '@nestjs/common';
import { CustomersRepository } from './customers.repository';
import { CreateCustomersDto } from './models/create-customers.dto';
import { Customers } from './dto/customers.entity';

@Injectable()
export class CustomersService {
  constructor(private readonly customersRepository: CustomersRepository) { }

  async create(createCustomersDto: CreateCustomersDto) {
    const customer = new Customers({
      ...createCustomersDto
    })

    return await this.customersRepository.create(customer);
  }

  async findAll() {
    return this.customersRepository.findAll();
  }

  async findOne(id: number) {
    return this.customersRepository.findOne({ id });
  }

  async update(id: number, updateCustomersDto: CreateCustomersDto) {
    return this.customersRepository.findOneAndUpdate(
      { id },
      updateCustomersDto,
    );
  }
  async remove(id: number) {
    return this.customersRepository.findOneAndDelete({ id });
  }

}
