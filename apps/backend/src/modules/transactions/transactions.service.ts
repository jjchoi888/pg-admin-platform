import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction, TransactionStatus, PaymentChannel } from './entities/transaction.entity';
import { Merchant, KybStatus } from '../merchants/entities/merchant.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Merchant)
    private readonly merchantRepository: Repository<Merchant>,
  ) {}

  // [추가됨] 관리자 대시보드용 전체 거래 내역 조회
  async findAll(): Promise<Transaction[]> {
    return await this.transactionRepository.find({
      order: { created_at: 'DESC' },
    });
  }

  // 1. 결제 생성 (Charge) - 기존 로직 완벽 유지
  async createTransaction(dto: {
    merchant_id: string;
    amount: number;
    channel: PaymentChannel;
    payment_method: string;
    source_id: string;
  }): Promise<Transaction> {
    // 가맹점 존재 및 승인 상태 확인 (BSP 규정 준수)
    const merchant = await this.merchantRepository.findOne({ where: { id: dto.merchant_id } });
    if (!merchant) throw new NotFoundException('가맹점을 찾을 수 없습니다.');
    if (merchant.kyb_status !== KybStatus.APPROVED) {
      throw new BadRequestException('승인되지 않은 가맹점은 결제를 진행할 수 없습니다.');
    }

    // 수수료 및 정산 예정액 계산 (MDR 로직 적용)
    const fee_amount = Number(dto.amount) * (Number(merchant.base_mdr_rate) / 100);
    const net_amount = Number(dto.amount) - fee_amount;

    const transaction = this.transactionRepository.create({
      ...dto,
      gross_amount: dto.amount,
      fee_amount: fee_amount,
      net_amount: net_amount,
      status: TransactionStatus.SUCCESS, // 실제 환경에서는 PG사 응답에 따라 변경
    });

    return await this.transactionRepository.save(transaction);
  }

  // 2. 가맹점별 거래 내역 조회 (OLA 신용 평가 기초 데이터용) - 기존 로직 유지
  async findByMerchant(merchantId: string): Promise<Transaction[]> {
    return await this.transactionRepository.find({
      where: { merchant_id: merchantId },
      order: { created_at: 'DESC' },
    });
  }
}