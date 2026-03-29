import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export enum KybStatus {
  PENDING = 'PENDING',
  IN_REVIEW = 'IN_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  SUSPENDED = 'SUSPENDED',
}

export enum RiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

@Entity('merchants')
export class Merchant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // OLA 시스템과의 연동을 위한 ID
  @Column({ type: 'uuid', nullable: true })
  ola_merchant_id: string;

  @Column({ type: 'varchar', length: 255 })
  business_name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  sec_dti_number: string;

  // 👇 여기에 nullable: true 옵션이 추가되었습니다.
  @Column({ type: 'varchar', length: 4, nullable: true })
  bsp_merchant_code: string;

  @Column({
    type: 'enum',
    enum: KybStatus,
    default: KybStatus.PENDING,
  })
  kyb_status: KybStatus;

  @Column({
    type: 'enum',
    enum: RiskLevel,
    default: RiskLevel.HIGH,
  })
  risk_level: RiskLevel;

  @Column({ type: 'uuid', nullable: true })
  sales_rep_id: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 2.5 })
  base_mdr_rate: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp with time zone' })
  deleted_at: Date;
}