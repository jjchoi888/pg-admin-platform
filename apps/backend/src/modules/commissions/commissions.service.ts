import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository, Repository } from 'typeorm';
import { Agent } from './entities/agent.entity';
import { CommissionLedger } from './entities/commission-ledger.entity';
import { Transaction } from '../transactions/entities/transaction.entity';

@Injectable()
export class CommissionsService {
  constructor(
    @InjectRepository(Agent)
    private readonly agentRepository: TreeRepository<Agent>,
    @InjectRepository(CommissionLedger)
    private readonly commissionRepository: Repository<CommissionLedger>,
  ) {}

  // 결제 완료 후 실행되는 커미션 분배 로직
  async distributeCommission(transaction: Transaction) {
    // 1. 가맹점을 유치한 최하위 에이전트(Sales Rep)부터 찾음
    const leafAgent = await this.agentRepository.findOne({
      where: { id: transaction.merchant.sales_rep_id }
    });

    if (!leafAgent) return;

    // 2. 상위 에이전트 계층을 모두 가져옴 (3단계 롤업)
    const ancestors = await this.agentRepository.findAncestors(leafAgent);
    
    // 3. 각 단계별 에이전트에게 마진율에 따른 금액 배분
    const promises = ancestors.map(agent => {
      const commissionAmount = Number(transaction.gross_amount) * (Number(agent.margin_rate) / 100);
      
      return this.commissionRepository.save({
        agent_id: agent.id,
        transaction_id: transaction.id,
        amount: commissionAmount,
      });
    });

    await Promise.all(promises);
  }
}