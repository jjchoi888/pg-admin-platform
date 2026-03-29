'use client';

import React from 'react';
import { CreditCard, DollarSign, Wallet, ArrowUpRight, Activity } from 'lucide-react';

export default function MerchantPortalView() {
    // 프레젠테이션을 위한 가짜(Mock) 데이터입니다.
    const myTransactions = [
        { id: 'tx-1', date: '2026-03-09 14:20', amount: 1500, fee: 45, net: 1455, method: 'GCash', status: 'SUCCESS' },
        { id: 'tx-2', date: '2026-03-09 13:15', amount: 800, fee: 24, net: 776, method: 'Card', status: 'SUCCESS' },
        { id: 'tx-3', date: '2026-03-09 11:05', amount: 3200, fee: 96, net: 3104, method: 'Maya', status: 'SUCCESS' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Merchant Portal</h2>
                    <p className="text-gray-500">Welcome back, N Plus Inc. (SEC-2025-GTB)</p>
                </div>
                <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-bold border border-blue-100 flex items-center gap-2">
                    <Activity className="w-5 h-5" /> Live Mode
                </div>
            </div>

            {/* 요약 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white shadow-lg">
                    <p className="text-blue-100 font-medium mb-1">Today's Gross Sales</p>
                    <h3 className="text-3xl font-bold">₱ 5,500.00</h3>
                    <p className="text-sm text-blue-200 mt-2 flex items-center gap-1"><ArrowUpRight className="w-4 h-4" /> +12% from yesterday</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 font-medium mb-1">MDR Fees (3.0%)</p>
                    <h3 className="text-3xl font-bold text-red-500">- ₱ 165.00</h3>
                    <p className="text-sm text-gray-400 mt-2">Deducted automatically</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 font-medium mb-1">Next Settlement (Net)</p>
                    <h3 className="text-3xl font-bold text-green-600">₱ 5,335.00</h3>
                    <p className="text-sm text-gray-400 mt-2">Expected payout: Tomorrow 10:00 AM</p>
                </div>
            </div>

            {/* 최근 결제 내역 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                    <h3 className="font-bold text-gray-800">Recent Transactions</h3>
                </div>
                <table className="w-full text-left text-sm">
                    <thead className="bg-white border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-gray-500 font-semibold">Time</th>
                            <th className="px-6 py-4 text-gray-500 font-semibold">Payment Method</th>
                            <th className="px-6 py-4 text-gray-500 font-semibold">Gross Amount</th>
                            <th className="px-6 py-4 text-gray-500 font-semibold">Net Amount</th>
                            <th className="px-6 py-4 text-gray-500 font-semibold">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {myTransactions.map((tx) => (
                            <tr key={tx.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-gray-600">{tx.date}</td>
                                <td className="px-6 py-4 font-medium text-gray-700">{tx.method}</td>
                                <td className="px-6 py-4 font-bold">₱ {tx.amount.toLocaleString()}</td>
                                <td className="px-6 py-4 font-bold text-green-600">₱ {tx.net.toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-bold">
                                        {tx.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}