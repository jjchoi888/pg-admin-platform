'use client';

import React from 'react';
import { Users, CreditCard, Landmark, TrendingUp } from 'lucide-react';

const SummaryCard = ({ title, value, subtext, icon: Icon }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-blue-50 rounded-lg">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">+12.5%</span>
    </div>
    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    <p className="text-gray-400 text-xs mt-2">{subtext}</p>
  </div>
);

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard 
          title="Total Merchants" 
          value="124" 
          subtext="Registered in Philippines" 
          icon={Users} 
        />
        <SummaryCard 
          title="Total Transactions" 
          value="₱ 1,240,500.00" 
          subtext="Gross Trading Volume" 
          icon={CreditCard} 
        />
        <SummaryCard 
          title="OLA Deductions" 
          value="₱ 340,200.00" 
          subtext="Loan Repayments Today" 
          icon={Landmark} 
        />
        <SummaryCard 
          title="Net Revenue" 
          value="₱ 82,450.00" 
          subtext="Platform MDR Earnings" 
          icon={TrendingUp} 
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[300px] flex items-center justify-center">
        <p className="text-gray-400">Transaction Volume Chart will be placed here.</p>
      </div>
    </div>
  );
}