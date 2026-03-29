'use client';

import React from 'react';
import { Users, UserPlus, TrendingUp } from 'lucide-react';

// Mock data for UI structure
const agents = [
  { id: 1, name: 'Main Sales Agent A', tier: 'SALES_AGENT', margin: '0.5%', revenue: '₱ 12,400' },
  { id: 2, name: 'Sub Agent B', tier: 'SUB_SALES_AGENT', margin: '0.3%', revenue: '₱ 4,200' },
  { id: 3, name: 'Field Rep C', tier: 'SALES_REP', margin: '0.2%', revenue: '₱ 1,800' },
];

export default function AgentNetwork() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Agent Hierarchy & Commission</h2>
        <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
          <UserPlus className="w-4 h-4" /> Register New Agent
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="bg-indigo-50 p-3 rounded-lg">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <span className="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-2 py-1 rounded uppercase tracking-tighter">
                {agent.tier.replace(/_/g, ' ')}
              </span>
            </div>
            <h3 className="mt-4 font-bold text-gray-900">{agent.name}</h3>
            <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-end">
              <div>
                <p className="text-xs text-gray-400 uppercase">Margin Rate</p>
                <p className="font-bold text-gray-700">{agent.margin}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 uppercase">Total Earnings</p>
                <p className="font-bold text-green-600">{agent.revenue}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}