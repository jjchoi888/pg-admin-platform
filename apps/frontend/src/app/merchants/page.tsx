'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CheckCircle, XCircle, Search, Plus } from 'lucide-react';

export default function MerchantManagement() {
  const [merchants, setMerchants] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    business_name: '',
    sec_dti_number: '',
    base_mdr_rate: 3.0,
  });

  const fetchMerchants = async () => {
    try {
      const response = await axios.get('http://localhost:3001/merchants');
      setMerchants(response.data);
    } catch (error) {
      console.error('Failed to fetch:', error);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/merchants/register', formData);
      setIsModalOpen(false);
      setFormData({ business_name: '', sec_dti_number: '', base_mdr_rate: 3.0 });
      fetchMerchants(); // 리스트 새로고침
    } catch (error) {
      alert('Registration failed. Check backend logs.');
    }
  };

  // 승인/거절 상태 업데이트 함수 (복구됨)
  const updateStatus = async (id: string, status: string) => {
    try {
      await axios.patch(`http://localhost:3001/merchants/${id}/status`, { status });
      fetchMerchants(); // 상태 변경 후 리스트 새로고침
    } catch (error) {
      alert('Failed to update status');
    }
  };

  useEffect(() => { fetchMerchants(); }, []);

  return (
    <div className="space-y-4">
      {/* 헤더 및 추가 버튼 */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Merchant Management</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" /> Add New Merchant
        </button>
      </div>

      {/* 가맹점 리스트 테이블 (복구됨) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Business Name</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">SEC/DTI Number</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Base MDR (%)</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">KYB Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {merchants.map((merchant) => (
              <tr key={merchant.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-900">{merchant.business_name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{merchant.sec_dti_number}</td>
                <td className="px-6 py-4 text-sm">{merchant.base_mdr_rate}%</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    merchant.kyb_status === 'APPROVED' ? 'bg-green-100 text-green-800' : 
                    merchant.kyb_status === 'REJECTED' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {merchant.kyb_status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  {merchant.kyb_status === 'PENDING' && (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => updateStatus(merchant.id, 'APPROVED')}
                        className="p-1 hover:text-green-600 transition-colors" title="Approve">
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => updateStatus(merchant.id, 'REJECTED')}
                        className="p-1 hover:text-red-600 transition-colors" title="Reject">
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {merchants.length === 0 && (
          <div className="py-12 text-center text-gray-400">
            No merchants found. Please register one via Add New Merchant button.
          </div>
        )}
      </div>
      
      {/* --- Registration Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold mb-6">Register New Merchant</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.business_name}
                  onChange={(e) => setFormData({...formData, business_name: e.target.value})}
                  placeholder="e.g. Go Tambayan Inc."
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SEC / DTI Number</label>
                <input 
                  required
                  type="text" 
                  value={formData.sec_dti_number}
                  onChange={(e) => setFormData({...formData, sec_dti_number: e.target.value})}
                  placeholder="SEC-2026-XXXXX"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Base MDR Rate (%)</label>
                <input 
                  required
                  type="number" 
                  step="0.1"
                  value={Number.isNaN(formData.base_mdr_rate) ? '' : formData.base_mdr_rate}
                  onChange={(e) => {
                    const parsed = parseFloat(e.target.value);
                    setFormData({...formData, base_mdr_rate: isNaN(parsed) ? 0 : parsed});
                  }}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="flex gap-3 mt-8">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2 bg-gray-100 text-gray-600 rounded-lg font-medium hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}