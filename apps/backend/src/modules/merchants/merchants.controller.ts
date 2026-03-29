import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { MerchantsService } from './merchants.service';
import { KybStatus } from './entities/merchant.entity';

@Controller('merchants') // 이 경로가 axios 요청 주소와 일치해야 합니다.
export class MerchantsController {
  constructor(private readonly merchantsService: MerchantsService) {}

  @Get() // GET http://localhost:3001/merchants
  async findAll() {
    return this.merchantsService.findAll();
  }

  @Post('register') // POST http://localhost:3001/merchants/register
  async register(@Body() createMerchantDto: any) {
    return this.merchantsService.createMerchant(createMerchantDto);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string, 
    @Body('status') status: KybStatus // @Body 내의 키 이름이 정확해야 합니다.
  ) {
    return this.merchantsService.updateStatus(id, status);
  }
}