import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Merchant } from '../../merchants/entities/merchant.entity';

export enum PaymentChannel {
  POS = 'POS',
  PAY_LINK = 'PAY_LINK',
  CHECKOUT = 'CHECKOUT',
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 가맹점과의 관계 설정 (N:1)
  @ManyToOne(() => Merchant)
  @JoinColumn({ name: 'merchant_id' })
  merchant: Merchant;

  @Column({ type: 'uuid' })
  merchant_id: string;

  // 결제 채널 구분
  @Column({ type: 'enum', enum: PaymentChannel })
  channel: PaymentChannel;

  // 발생 출처 ID (Terminal ID 또는 PayLink ID)
  @Column({ type: 'uuid' })
  source_id: string;

  // 결제 수단 (CARD, GCASH, MAYA 등)
  @Column({ type: 'varchar', length: 50 })
  payment_method: string;

  // 총 결제 금액 (Gross Amount)
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  gross_amount: number;

  // 플랫폼 수수료 (Fee)
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  fee_amount: number;

  // 가맹점 실지급 예정액 (Net Amount = Gross - Fee)
  // OLA 상환액 공제의 기준이 되는 금액입니다.
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  net_amount: number;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  status: TransactionStatus;

  // BSP/AMLC 규정 준수를 위한 고객 메타데이터 (IP, 마스킹된 카드번호 등)
  @Column({ type: 'jsonb', nullable: true })
  customer_info: any;

  @Column({ type: 'varchar', nullable: true })
  error_code: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;
}