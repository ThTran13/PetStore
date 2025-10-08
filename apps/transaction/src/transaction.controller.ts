import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { GetTransactionDto } from './dto/get-transaction.dto';
import { JwtAuthGuard } from '@app/common';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getTransaction(): Promise<GetTransactionDto[]> {
    return this.transactionService.getAllTransactions();
  }
}
 