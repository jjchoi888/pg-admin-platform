import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { PaymentChannel } from './entities/transaction.entity';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  // [추가됨] 프론트엔드의 기본 GET 요청을 처리합니다.
  @Get()
  async findAll() {
    return this.transactionsService.findAll();
  }

  // 기존 로직 유지
  @Post('charge')
  async charge(
    @Body() body: {
      merchant_id: string;
      amount: number;
      channel: PaymentChannel;
      payment_method: string;
      source_id: string;
    },
  ) {
    return this.transactionsService.createTransaction(body);
  }

  // 기존 로직 유지
  @Get('merchant/:merchantId')
  async getByMerchant(@Param('merchantId') merchantId: string) {
    return this.transactionsService.findByMerchant(merchantId);
  }
}