import React, { useState } from 'react';
import {
  Sparkles,
  Users,
  GraduationCap,
  Briefcase,
  Shield,
  HeartHandshake,
  User,
  QrCode,
  FileText,
  Camera,
  CheckCircle2,
  Settings,
  CreditCard,
  Layers,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { UserRole } from '../types';

interface RoleSwitcherProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  onOpenModal: (modalName: string) => void;
}

export const RoleSwitcher: React.FC<RoleSwitcherProps> = ({
  currentRole,
  onSelectRole,
  onOpenModal,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const roles: { id: UserRole; label: string; icon: React.ElementType; color: string; desc: string }[] = [
    { id: 'landing', label: '1. Landing Page', icon: GraduationCap, color: 'text-indigo-600', desc: 'Marketing & Overview' },
    { id: 'school_admin', label: '2. Admin (Records)', icon: Shield, color: 'text-blue-600', desc: 'Student SIS & Classes' },
    { id: 'teacher', label: '3. Teacher (Mr. Adewale)', icon: Briefcase, color: 'text-indigo-600', desc: 'Schedule & AI Lesson' },
    { id: 'principal', label: '4. Principal (Mrs. Adeyemi)', icon: Users, color: 'text-purple-600', desc: 'Performance & Leadership' },
    { id: 'super_admin', label: '5. Super Admin', icon: Layers, color: 'text-emerald-600', desc: 'SaaS Platform Owner' },
    { id: 'parent', label: '6. Parent (Mrs. Bello)', icon: HeartHandshake, color: 'text-amber-600', desc: 'Children & Fees' },
    { id: 'student', label: '7. Student (Nathan Bello)', icon: User, color: 'text-indigo-500', desc: 'Learning & Streaks' },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center">
      {/* Expanded Tools Tray */}
      {isExpanded && (
        <div className="mb-2.5 p-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200/80 w-[92vw] max-w-4xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Skooleo Interactive Sandbox & Role Navigator
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              Click any role or tool to preview full interface
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5 mb-3">
            {roles.map((r) => {
              const Icon = r.icon;
              const isActive = currentRole === r.id;

              return (
                <button
                  key={r.id}
                  id={`switcher-role-${r.id}`}
                  onClick={() => {
                    onSelectRole(r.id);
                  }}
                  className={`p-2 rounded-xl text-left transition-all flex flex-col gap-1 border ${
                    isActive
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200'
                      : 'bg-slate-50 hover:bg-indigo-50/70 border-slate-200/60 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : r.color}`} />
                    <span className="text-[11px] font-bold truncate">{r.label}</span>
                  </div>
                  <span className={`text-[9.5px] truncate leading-tight ${isActive ? 'text-indigo-100' : 'text-slate-500'}`}>
                    {r.desc}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Action Tools Bar */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100 overflow-x-auto pb-1">
            <span className="text-[10px] font-semibold text-slate-400 uppercase whitespace-nowrap pl-1">
              Interactive Tools:
            </span>

            <button
              id="tool-smartmark"
              onClick={() => onOpenModal('smartmark_scan')}
              className="px-2.5 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-semibold flex items-center gap-1.5 border border-purple-200 transition-colors whitespace-nowrap"
            >
              <QrCode className="w-3.5 h-3.5 text-purple-600" />
              <span>SmartMark OMR Scanner</span>
            </button>

            <button
              id="tool-ai-lesson"
              onClick={() => onOpenModal('ai_lesson')}
              className="px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center gap-1.5 border border-indigo-200 transition-colors whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>AI Lesson Builder</span>
            </button>

            <button
              id="tool-register"
              onClick={() => onOpenModal('register_student')}
              className="px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold flex items-center gap-1.5 border border-blue-200 transition-colors whitespace-nowrap"
            >
              <Camera className="w-3.5 h-3.5 text-blue-600" />
              <span>Webcam Photo & Student SIS</span>
            </button>

            <button
              id="tool-attendance"
              onClick={() => onOpenModal('attendance')}
              className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold flex items-center gap-1.5 border border-emerald-200 transition-colors whitespace-nowrap"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Take Attendance</span>
            </button>

            <button
              id="tool-report-card"
              onClick={() => onOpenModal('report_card')}
              className="px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-semibold flex items-center gap-1.5 border border-amber-200 transition-colors whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5 text-amber-600" />
              <span>Terminal Report Card</span>
            </button>

            <button
              id="tool-result-checker"
              onClick={() => onOpenModal('result_checker')}
              className="px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold flex items-center gap-1.5 border border-rose-200 transition-colors whitespace-nowrap"
            >
              <Shield className="w-3.5 h-3.5 text-rose-600" />
              <span>Result PIN Checker</span>
            </button>

            <button
              id="tool-onboarding"
              onClick={() => onOpenModal('onboarding_wizard')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 border border-slate-200 transition-colors whitespace-nowrap"
            >
              <Settings className="w-3.5 h-3.5 text-slate-600" />
              <span>10-Step Setup Wizard</span>
            </button>

            <button
              id="tool-payment"
              onClick={() => onOpenModal('make_payment')}
              className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold flex items-center gap-1.5 border border-emerald-200 transition-colors whitespace-nowrap"
            >
              <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
              <span>Fee Payment</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Pill Toggle Button */}
      <div className="flex items-center gap-2 bg-slate-900/90 hover:bg-slate-900 text-white backdrop-blur-md px-4 py-2 rounded-full shadow-xl border border-slate-700/60 transition-all">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          <span className="text-xs font-bold tracking-wide">
            Viewing: <span className="text-indigo-300 font-semibold">{roles.find(r => r.id === currentRole)?.label}</span>
          </span>
        </div>

        <div className="h-3.5 w-px bg-slate-700 mx-1" />

        <button
          id="btn-toggle-role-switcher"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-xs font-semibold text-slate-200 hover:text-white transition-colors"
        >
          <span>{isExpanded ? 'Collapse Menu' : 'Switch Role / Open Tools'}</span>
          {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
