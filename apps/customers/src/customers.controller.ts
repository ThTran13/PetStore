import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomersDto } from './models/create-customers.dto';
import { JwtAuthGuard } from '@app/common';

@Controller('customer')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async createCustomer(@Body() createCustomersDto: CreateCustomersDto) {
    return this.customersService.create(createCustomersDto);
  }

  @Get()
  async getAllCustomers() {
    return this.customersService.findAll();
  }

  @Get(':id')
  async getCustomerById(@Param('id') id: number) {
    return this.customersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateCustomer(@Param('id') id: number, @Body() updateCustomersDto: CreateCustomersDto) {
    return this.customersService.update(+id, updateCustomersDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeCustomer(@Param('id') id: number) {
    return this.customersService.remove(+id);
  }
}
