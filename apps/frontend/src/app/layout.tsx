import './globals.css';
import React from 'react';

export const metadata = {
  title: 'PG Admin Platform - Philippines',
  description: 'Merchant & Transaction Management System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="flex h-screen overflow-hidden">
        {/* 사이드바 */}
        <aside className="w-64 bg-slate-900 text-white flex-shrink-0">
          <div className="p-6 text-xl font-bold border-b border-slate-800">
            PG ADMIN
          </div>
          <nav className="mt-6">
            <a href="/" className="block py-3 px-6 hover:bg-slate-800 text-sm font-medium">Dashboard Overview</a>
            <a href="/merchants" className="block py-3 px-6 hover:bg-slate-800 text-sm font-medium">Merchant Management</a>
            <a href="/transactions" className="block py-3 px-6 hover:bg-slate-800 text-sm font-medium">Transaction Records</a>
            <a href="/settlements" className="block py-3 px-6 hover:bg-slate-800 text-sm font-medium">Settlement & Payouts</a>
            <a href="/agents" className="block py-3 px-6 hover:bg-slate-800 text-sm font-medium">Agent Network</a>
          </nav>
        </aside>

        {/* 메인 콘텐츠 영역 */}
        <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
          <header className="mb-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-slate-800">System Overview</h1>
            <div className="text-sm text-slate-500">2026-03-09 | Metro Manila</div>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}