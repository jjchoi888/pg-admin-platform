import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Agent } from './agent.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';

@Entity('commission_ledger')
export class CommissionLedger {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Agent)
  agent: Agent;

  @Column({ type: 'uuid' })
  agent_id: string;

  @ManyToOne(() => Transaction)
  transaction: Transaction;

  @Column({ type: 'uuid' })
  transaction_id: string;

  // 해당 에이전트가 이 거래에서 번 실제 금액 (PHP)
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @CreateDateColumn()
  created_at: Date;
}