import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Merchant } from '../../merchants/entities/merchant.entity';

@Entity('settlements')
export class Settlement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Merchant)
  @JoinColumn({ name: 'merchant_id' })
  merchant: Merchant;

  @Column({ type: 'uuid' })
  merchant_id: string;

  // 정산 대상 날짜 (T+1 기준)
  @Column({ type: 'date' })
  settlement_date: Date;

  // 당일 총 성공 거래액
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  total_sales: number;

  // 당일 발생한 총 PG 수수료
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  pg_fee: number;

  // ⭐ OLA 시스템에서 공제한 대출/선지급 상환액
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  ola_deduction: number;

  // 가맹점 은행 계좌로 실제 입금된 최종 금액
  // Net Payout = Total Sales - PG Fee - OLA Deduction
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  net_payout: number;

  @Column({ type: 'varchar', default: 'PROCESSING' })
  payout_status: string; // PROCESSING, SUCCESS, FAILED

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;
}