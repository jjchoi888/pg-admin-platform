import { Injectable } from '@nestjs/common';

@Injectable()
export class FdsService {
  // BSP 규정에 따른 고액 거래 및 이상 패턴 감지 기초 로직
  async validateTransaction(merchantId: string, amount: number): Promise<boolean> {
    const HIGH_VALUE_THRESHOLD = 500000; // 50만 페소 이상은 정밀 심사 대상

    if (amount > HIGH_VALUE_THRESHOLD) {
      console.warn(`[FDS ALERT] High value transaction detected for Merchant: ${merchantId}`);
      // 실제 운영 시에는 여기서 거래를 잠시 'PENDING' 시키거나 알림을 보냅니다.
    }

    return true; // 우선은 모든 거래 통과로 설정
  }
}