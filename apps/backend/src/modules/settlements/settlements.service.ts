import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Settlement } from './entities/settlement.entity';
import { Transaction, TransactionStatus } from '../transactions/entities/transaction.entity';
import { Merchant } from '../merchants/entities/merchant.entity';

@Injectable()
export class SettlementsService {
  constructor(
    @InjectRepository(Settlement)
    private readonly settlementRepository: Repository<Settlement>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Merchant)
    private readonly merchantRepository: Repository<Merchant>,
  ) {}

  // [추가됨] 프론트엔드 대시보드용 전체 정산 내역 조회
  async findAll(): Promise<Settlement[]> {
    return await this.settlementRepository.find({
      order: { created_at: 'DESC' },
    });
  }

  // 일일 정산 실행 로직 (T+1 기준) - 기존 로직 완벽 유지
  async generateDailySettlement(merchantId: string, date: Date) {
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    // 1. 해당 날짜의 성공한 모든 거래 집계
    const transactions = await this.transactionRepository.find({
      where: {
        merchant_id: merchantId,
        status: TransactionStatus.SUCCESS,
        created_at: Between(startOfDay, endOfDay),
      },
    });

    if (transactions.length === 0) return null;

    const totalSales = transactions.reduce((sum, tx) => sum + Number(tx.gross_amount), 0);
    const totalFee = transactions.reduce((sum, tx) => sum + Number(tx.fee_amount), 0);
    
    // 2. OLA 시스템 상환액 조회 (가정: OLA 모듈에서 데이터를 가져옴)
    // 실제로는 OLA API를 호출하여 해당 가맹점의 오늘자 상환액을 받아옵니다.
    const olaDeduction = await this.getOlaDeductionAmount(merchantId);

    // 3. 최종 지급액 계산 (Net Payout = Gross - Fee - OLA)
    const netPayout = totalSales - totalFee - olaDeduction;

    const settlement = this.settlementRepository.create({
      merchant_id: merchantId,
      settlement_date: startOfDay,
      total_sales: totalSales,
      pg_fee: totalFee,
      ola_deduction: olaDeduction,
      net_payout: netPayout > 0 ? netPayout : 0, // 정산금이 마이너스일 경우 0 처리
      payout_status: 'READY',
    });

    return await this.settlementRepository.save(settlement);
  }

  // OLA 상환액 조회 함수 (내부 브릿지 로직) - 기존 로직 유지
  private async getOlaDeductionAmount(merchantId: string): Promise<number> {
    // 여기에 OLA 시스템 API 호출 로직이 들어갑니다.
    // 이전 대화 내용에 따라 OLA 시스템의 가맹점 ID와 매핑하여 조회합니다.
    return 1500.00; // 테스트용 고정값
  }
}