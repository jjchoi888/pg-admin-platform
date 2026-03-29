'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Landmark, ArrowDownCircle, RefreshCw } from 'lucide-react';

interface Settlement {
  id: string;
  merchant_id: string;
  settlement_date: string;
  total_sales: number;
  pg_fee: number;
  ola_deduction: number;
  net_payout: number;
  payout_status: string;
}

export default function SettlementManagement() {
  const [settlements, setSettlements] = useState<Settlement[]>([]);

  const fetchSettlements = async () => {
    try {
      const response = await axios.get('http://localhost:3001/settlements'); // 백엔드 API 연결
      setSettlements(response.data);
    } catch (error) {
      console.error('Failed to fetch settlements:', error);
    }
  };

  useEffect(() => {
    fetchSettlements();
  }, []);

  return (
    <div className="space-y-6">
      {/* Settlement Summary Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Daily Settlement Overview</h2>
        <button 
          onClick={fetchSettlements}
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          <RefreshCw className="w-4 h-4" /> Refresh Data
        </button>
      </div>

      {/* Settlement Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-600 uppercase">Settlement Date</th>
              <th className="px-6 py-4 font-semibold text-gray-600 uppercase">Gross Sales</th>
              <th className="px-6 py-4 font-semibold text-gray-600 uppercase">PG Fee (MDR)</th>
              <th className="px-6 py-4 font-semibold text-red-600 uppercase">OLA Deduction</th>
              <th className="px-6 py-4 font-semibold text-blue-700 uppercase">Net Payout</th>
              <th className="px-6 py-4 font-semibold text-gray-600 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {settlements.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-gray-700 font-medium">
                  {new Date(s.settlement_date).toLocaleDateString('en-PH')}
                </td>
                <td className="px-6 py-4 font-semibold">₱ {Number(s.total_sales).toLocaleString()}</td>
                <td className="px-6 py-4 text-gray-500">- ₱ {Number(s.pg_fee).toLocaleString()}</td>
                <td className="px-6 py-4 text-red-500 font-bold">- ₱ {Number(s.ola_deduction).toLocaleString()}</td>
                <td className="px-6 py-4 text-blue-700 font-extrabold text-base">
                  ₱ {Number(s.net_payout).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    s.payout_status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {s.payout_status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {settlements.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center gap-3">
            <Landmark className="w-12 h-12 text-gray-200" />
            <p className="text-gray-400">No settlement records for the selected period.</p>
          </div>
        )}
      </div>
    </div>
  );
}