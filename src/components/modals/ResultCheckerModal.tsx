import React, { useState } from 'react';
import {
  X,
  Shield,
  Search,
  Key,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { INITIAL_STUDENTS } from '../../data/mockData';
import { StudentRecord } from '../../types';

interface ResultCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
  student?: StudentRecord | null;
  onOpenReportCard: (student: StudentRecord) => void;
}

export const ResultCheckerModal: React.FC<ResultCheckerModalProps> = ({
  isOpen,
  onClose,
  student,
  onOpenReportCard,
}) => {
  const [admissionNo, setAdmissionNo] = useState(student?.admissionNo || 'RGA26/1006');
  const [session, setSession] = useState('2026/2027');
  const [term, setTerm] = useState('First Term');
  const [pin, setPin] = useState('9842-7105-3391');
  const [serialNo, setSerialNo] = useState('SKL-2026-8841');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  if (!isOpen) return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      setVerified(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    }, 600);
  };

  const matchedStudent = INITIAL_STUDENTS.find(s => s.admissionNo === admissionNo) || student || INITIAL_STUDENTS[5];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-rose-500 to-indigo-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold">Public Result PIN Checker</h2>
              <p className="text-[10.5px] text-white/80">Secured e-Result Portal</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        {!verified ? (
          <form onSubmit={handleVerify} className="p-6 space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Student Admission Number</label>
              <input
                type="text"
                required
                value={admissionNo}
                onChange={(e) => setAdmissionNo(e.target.value)}
                placeholder="e.g. RGA26/1006"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Academic Session</label>
                <select
                  value={session}
                  onChange={(e) => setSession(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-slate-800"
                >
                  <option>2026/2027</option>
                  <option>2025/2026</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Term</label>
                <select
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-slate-800"
                >
                  <option>First Term</option>
                  <option>Second Term</option>
                  <option>Third Term</option>
                </select>
              </div>
            </div>

            {/* Scratch Card PIN & Serial */}
            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-2">
              <div className="flex items-center gap-1 text-[11px] font-bold text-amber-900">
                <Key className="w-3.5 h-3.5 text-amber-600" />
                <span>Scratch Card PIN Details</span>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 block mb-0.5">PIN Code (12 Digits)</label>
                <input
                  type="text"
                  required
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full bg-white border border-amber-200 rounded-lg p-1.5 font-mono text-slate-900 font-bold tracking-wider"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 block mb-0.5">Serial Number</label>
                <input
                  type="text"
                  required
                  value={serialNo}
                  onChange={(e) => setSerialNo(e.target.value)}
                  className="w-full bg-white border border-amber-200 rounded-lg p-1.5 font-mono text-slate-900 font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-1.5"
            >
              {isVerifying ? 'Verifying PIN against Ledger...' : 'Check Result Now →'}
            </button>
          </form>
        ) : (
          <div className="p-6 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-sm">PIN Verified Successfully!</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Authentic terminal result found for {matchedStudent.name} ({session}, {term})
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-left space-y-1">
              <div className="flex justify-between"><span>Candidate:</span> <strong>{matchedStudent.name}</strong></div>
              <div className="flex justify-between"><span>Class:</span> <strong>{matchedStudent.classArm}</strong></div>
              <div className="flex justify-between"><span>Term Average:</span> <strong className="text-indigo-600">{matchedStudent.currentAverage}%</strong></div>
              <div className="flex justify-between"><span>PIN Usage:</span> <strong>1 of 5 attempts used</strong></div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenReportCard(matchedStudent);
              }}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow-md"
            >
              View & Download Official Result Sheet →
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
