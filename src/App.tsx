/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SellerFunnel } from './components/seller/SellerFunnel';
import { BuyerDiscovery } from './components/buyer/BuyerDiscovery';
import { CrmDashboard } from './components/crm/CrmDashboard';
import { ConsentPortal } from './components/compliance/ConsentPortal';
import { Building2, Search, Users2, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'SELLER' | 'BUYER' | 'CRM' | 'CONSENT'>('CONSENT');

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F9]">
      {/* Top Demo Navigation Switcher */}
      <nav className="bg-[#172033] text-white px-4 py-2.5 border-b border-gray-800 shrink-0 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-sm tracking-tight font-['Montserrat'] text-white">SellMyGhar</span>
            <span className="text-gray-400">| Bengaluru Resale Platform</span>
          </div>

          <div className="flex items-center space-x-1.5 bg-gray-800/80 p-1 rounded-lg border border-gray-700 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('SELLER')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors flex items-center space-x-1.5 shrink-0 cursor-pointer ${
                activeTab === 'SELLER'
                  ? 'bg-[#244B8F] text-white shadow-xs'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Seller Funnel</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('BUYER')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors flex items-center space-x-1.5 shrink-0 cursor-pointer ${
                activeTab === 'BUYER'
                  ? 'bg-[#244B8F] text-white shadow-xs'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Buyer Marketplace</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('CRM')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors flex items-center space-x-1.5 shrink-0 cursor-pointer ${
                activeTab === 'CRM'
                  ? 'bg-[#244B8F] text-white shadow-xs'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Users2 className="w-3.5 h-3.5" />
              <span>Staff CRM & RBAC</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('CONSENT')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors flex items-center space-x-1.5 shrink-0 cursor-pointer ${
                activeTab === 'CONSENT'
                  ? 'bg-[#244B8F] text-white shadow-xs'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>DPDP Consent Portal</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'SELLER' && <SellerFunnel />}
        {activeTab === 'BUYER' && <BuyerDiscovery />}
        {activeTab === 'CRM' && <CrmDashboard />}
        {activeTab === 'CONSENT' && <ConsentPortal />}
      </main>
    </div>
  );
}



