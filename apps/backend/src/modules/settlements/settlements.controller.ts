import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { SettlementsService } from './settlements.service';

@Controller('settlements')
export class SettlementsController {
  constructor(private readonly settlementsService: SettlementsService) {}

  // [추가됨] 프론트엔드의 GET 요청을 처리하여 전체 정산 내역을 반환합니다.
  @Get()
  async findAll() {
    return this.settlementsService.findAll();
  }

  // 특정 가맹점의 특정 날짜 정산 수동 실행 (테스트용) - 기존 로직 유지
  @Post('generate')
  async generate(@Body() body: { merchantId: string; date: string }) {
    return this.settlementsService.generateDailySettlement(
      body.merchantId,
      new Date(body.date),
    );
  }
}