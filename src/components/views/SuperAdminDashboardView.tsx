import React, { useState } from 'react';
import {
  Building2,
  Users,
  DollarSign,
  Activity,
  ArrowUpRight,
  TrendingUp,
  Server,
  Database,
  Cpu,
  Plus,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Search,
  Download,
  Filter
} from 'lucide-react';
import { RECENT_SCHOOLS } from '../../data/mockData';

interface SuperAdminDashboardViewProps {
  onOpenModal: (modalName: string, data?: any) => void;
  onNavigateTab: (tab: string) => void;
}

export const SuperAdminDashboardView: React.FC<SuperAdminDashboardViewProps> = ({
  onOpenModal,
  onNavigateTab,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState('All');

  const filteredSchools = RECENT_SCHOOLS.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = filterPlan === 'All' || s.plan === filterPlan;
    return matchesSearch && matchesPlan;
  });

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-in fade-in duration-200">
      
      {/* Top SaaS Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Super Admin Platform HQ <span className="text-xl">⚡</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Global SaaS Infrastructure, Multi-School Tenants & Revenue Analytics
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onOpenModal('onboarding_wizard')}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-200 transition-all hover:shadow"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Provision New School</span>
          </button>
        </div>
      </div>

      {/* 6 Top Platform Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        
        {/* Metric 1 */}
        <div className="bg-white rounded-2xl p-4.5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="mt-2.5">
            <p className="text-[11.5px] font-medium text-slate-500">Active Schools</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-0.5">342</p>
            <p className="text-[10.5px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-0.5">
              <ArrowUpRight className="w-3 h-3" />
              <span>+14.2% this month</span>
            </p>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-2xl p-4.5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div className="mt-2.5">
            <p className="text-[11.5px] font-medium text-slate-500">Managed Students</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-0.5">184,290</p>
            <p className="text-[10.5px] text-blue-600 font-semibold mt-0.5">
              Across 12 States
            </p>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-2xl p-4.5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
          <div className="mt-2.5">
            <p className="text-[11.5px] font-medium text-slate-500">Monthly Revenue (MRR)</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-0.5">₦28.4M</p>
            <p className="text-[10.5px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-0.5">
              <ArrowUpRight className="w-3 h-3" />
              <span>+18.5% YoY</span>
            </p>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white rounded-2xl p-4.5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Activity className="w-5 h-5" />
          </div>
          <div className="mt-2.5">
            <p className="text-[11.5px] font-medium text-slate-500">System Uptime</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-0.5">99.98%</p>
            <p className="text-[10.5px] text-emerald-600 font-semibold mt-0.5">
              All 14 Nodes Healthy
            </p>
          </div>
        </div>

        {/* Metric 5 */}
        <div className="bg-white rounded-2xl p-4.5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <div className="mt-2.5">
            <p className="text-[11.5px] font-medium text-slate-500">SmartMark Scans</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-0.5">142,500</p>
            <p className="text-[10.5px] text-amber-600 font-semibold mt-0.5">
              99.94% OCR Confidence
            </p>
          </div>
        </div>

        {/* Metric 6 */}
        <div className="bg-white rounded-2xl p-4.5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <div className="mt-2.5">
            <p className="text-[11.5px] font-medium text-slate-500">Cloud Storage</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-0.5">4.8 TB</p>
            <p className="text-[10.5px] text-slate-500 font-medium mt-0.5">
              48% of 10 TB provisioned
            </p>
          </div>
        </div>

      </div>

      {/* Row 2: Recent School Registrations Table + Plan Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Table (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-slate-900">Recent School Registrations</h2>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative w-44 sm:w-56">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter schools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="pb-3 pl-2">School Name</th>
                  <th className="pb-3">Location</th>
                  <th className="pb-3">Plan</th>
                  <th className="pb-3">Enrolled</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right pr-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredSchools.map((sch) => (
                  <tr key={sch.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 pl-2 font-bold text-slate-900">{sch.name}</td>
                    <td className="py-3 text-slate-500 font-medium">{sch.location}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {sch.plan}
                      </span>
                    </td>
                    <td className="py-3 font-bold text-slate-800">{sch.studentsCount}</td>
                    <td className="py-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {sch.status}
                      </span>
                    </td>
                    <td className="py-3 text-right pr-2">
                      <button
                        onClick={() => onOpenModal('onboarding_wizard')}
                        className="text-xs font-semibold text-indigo-600 hover:underline"
                      >
                        Manage Tenant
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Plan Distribution & Microservice Health (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Plan Distribution */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Subscription Plan Distribution</h3>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-bold text-slate-800 mb-1">
                  <span>Growth Plan (500-1500 students)</span>
                  <span>42% (144 schools)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '42%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-800 mb-1">
                  <span>Premium Enterprise (&gt;1500 students)</span>
                  <span>28% (96 schools)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '28%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-800 mb-1">
                  <span>Starter / Basic (&lt;500 students)</span>
                  <span>30% (102 schools)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '30%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Microservices Status */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-3">AI & Engine Services Health</h3>
            
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50/50 border border-emerald-100">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-slate-800">Gemini 2.5 AI Lesson Planner</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700">110ms • Operational</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50/50 border border-emerald-100">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-slate-800">SmartMark OMR Image Engine</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700">99.9% • Online</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50/50 border border-emerald-100">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-slate-800">Cloud Storage & Photo Vault</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700">Encrypted • 100%</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
