'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CreditCard, RefreshCw, Activity } from 'lucide-react';

export default function TransactionRecords() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      // 백엔드에서 모든 결제 내역을 가져옵니다.
      const response = await axios.get('http://localhost:3001/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      // 백엔드 모듈이 아직 없어서 에러가 나더라도 화면이 깨지지 않도록 처리합니다.
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // 총 결제액, 총 수수료 자동 계산 로직
  const totalVolume = transactions.reduce((acc, curr) => acc + Number(curr.gross_amount || 0), 0);
  const totalFees = transactions.reduce((acc, curr) => acc + Number(curr.fee_amount || 0), 0);

  return (
    <div className="space-y-6">
      {/* 헤더 부분 */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Transaction Records</h2>
        <button
          onClick={fetchTransactions}
          className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          <RefreshCw className="w-4 h-4" /> Refresh Data
        </button>
      </div>

      {/* 요약 카드 (총 거래액, 수수료, 시스템 상태) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Total Volume</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">₱ {totalVolume.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Total MDR Fees</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">₱ {totalFees.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">System Status</p>
          <div className="flex items-center gap-2 mt-2">
            <Activity className="w-5 h-5 text-green-500" />
            <p className="text-xl font-bold text-green-600">Online</p>
          </div>
        </div>
      </div>

      {/* 실시간 결제 내역 테이블 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider">Merchant ID</th>
              <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider">Gross Amount</th>
              <th className="px-6 py-4 font-semibold text-red-500 uppercase tracking-wider">MDR Fee</th>
              <th className="px-6 py-4 font-semibold text-green-600 uppercase tracking-wider">Net Payout</th>
              <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-400">Loading transactions...</td>
              </tr>
            ) : transactions.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-400">
                  <div className="flex flex-col items-center">
                    <CreditCard className="w-10 h-10 mb-3 text-gray-300" />
                    <p>No transactions recorded yet.</p>
                  </div>
                </td>
              </tr>
            ) : (
              transactions.map((tx: any) => (
                <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-600">{new Date(tx.created_at).toLocaleString('en-PH')}</td>
                  <td className="px-6 py-4 font-medium text-gray-500 truncate max-w-[120px]" title={tx.merchant_id}>
                    {tx.merchant_id.substring(0, 8)}...
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">₱ {Number(tx.gross_amount).toLocaleString()}</td>
                  <td className="px-6 py-4 text-red-500 font-medium">- ₱ {Number(tx.fee_amount).toLocaleString()}</td>
                  <td className="px-6 py-4 text-green-600 font-bold text-base">₱ {Number(tx.net_amount).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-800 px-2.5 py-1 rounded-full text-xs font-bold">
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}