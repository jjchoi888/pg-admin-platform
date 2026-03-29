import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Merchant, KybStatus, RiskLevel } from './entities/merchant.entity';

@Injectable()
export class MerchantsService {
  constructor(
    @InjectRepository(Merchant)
    private merchantRepository: Repository<Merchant>,
  ) {}

  async createMerchant(dto: any): Promise<Merchant> {
    const randomBspCode = String(Math.floor(1000 + Math.random() * 9000));

    // TypeScript가 헷갈리지 않도록, 필드를 직접 매핑하여 단일 객체임을 명확히 합니다.
    const merchant = this.merchantRepository.create({
      business_name: dto.business_name,
      sec_dti_number: dto.sec_dti_number,
      base_mdr_rate: dto.base_mdr_rate,
      bsp_merchant_code: randomBspCode,
      risk_level: RiskLevel.LOW,
    });

    return await this.merchantRepository.save(merchant);
  }

  async findAll(): Promise<Merchant[]> {
    return await this.merchantRepository.find();
  }

  async updateStatus(id: string, status: KybStatus): Promise<Merchant> {
    const merchant = await this.merchantRepository.findOne({ where: { id } });
    if (!merchant) {
      throw new NotFoundException(`Merchant with ID ${id} not found`);
    }
    
    merchant.kyb_status = status;
    return await this.merchantRepository.save(merchant);
  }
}