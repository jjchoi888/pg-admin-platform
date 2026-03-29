import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MerchantsModule } from './modules/merchants/merchants.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { CommissionsModule } from './modules/commissions/commissions.module';
import { SettlementsModule } from './modules/settlements/settlements.module';

// 엔티티 임포트
import { Merchant } from './modules/merchants/entities/merchant.entity';
import { Transaction } from './modules/transactions/entities/transaction.entity';
import { Agent } from './modules/commissions/entities/agent.entity';
import { CommissionLedger } from './modules/commissions/entities/commission-ledger.entity';
import { Settlement } from './modules/settlements/entities/settlement.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin1234', // 실제 비번으로 수정
      database: 'pg_admin_db',
      entities: [Merchant, Transaction, Agent, CommissionLedger, Settlement],
      synchronize: true,
    }),
    MerchantsModule,
    TransactionsModule,
    CommissionsModule,
    SettlementsModule,
  ],
})
export class AppModule {}