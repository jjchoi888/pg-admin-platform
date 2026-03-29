import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agent } from './entities/agent.entity';
import { CommissionLedger } from './entities/commission-ledger.entity';
import { CommissionsService } from './commissions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Agent, CommissionLedger])],
  providers: [CommissionsService],
  exports: [CommissionsService],
})
export class CommissionsModule {}