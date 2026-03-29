import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettlementsController } from './settlements.controller';
import { SettlementsService } from './settlements.service';
import { Settlement } from './entities/settlement.entity';
import { Transaction } from '../transactions/entities/transaction.entity';
import { Merchant } from '../merchants/entities/merchant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Settlement, Transaction, Merchant])],
  controllers: [SettlementsController],
  providers: [SettlementsService],
})
export class SettlementsModule {}