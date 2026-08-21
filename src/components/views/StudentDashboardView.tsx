import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Award,
  Clock,
  CheckCircle2,
  Flame,
  ArrowRight,
  TrendingUp,
  Target,
  Trophy,
  Star,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SAMPLE_REPORT_CARD } from '../../data/mockData';

interface StudentDashboardViewProps {
  onOpenModal: (modalName: string, data?: any) => void;
  onNavigateTab: (tab: string) => void;
}

export const StudentDashboardView: React.FC<StudentDashboardViewProps> = ({
  onOpenModal,
  onNavigateTab,
}) => {
  const [activeQuizQuestion, setActiveQuizQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const practiceQuestions = [
    {
      question: 'Simplify the algebraic fraction: (4x² - 16) / (2x + 4)',
      options: ['2x - 4', '2x + 4', '4x - 2', '2(x - 2)'],
      correct: '2x - 4',
      explanation: 'Factor numerator 4(x² - 4) = 4(x-2)(x+2). Denominator 2(x+2). Cancel (x+2) -> 4/2 * (x-2) = 2(x-2) = 2x - 4.',
    },
    {
      question: 'What is the value of x in the equation: 3(x - 4) = 15?',
      options: ['x = 9', 'x = 7', 'x = 5', 'x = 11'],
      correct: 'x = 9',
      explanation: 'Divide both sides by 3 -> x - 4 = 5 -> x = 9.',
    }
  ];

  const handleSelectOption = (opt: string) => {
    if (quizAnswered) return;
    setSelectedOption(opt);
    setQuizAnswered(true);

    const isCorrect = opt === practiceQuestions[activeQuizQuestion].correct;
    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
      });
    }
  };

  const nextQuestion = () => {
    if (activeQuizQuestion < practiceQuestions.length - 1) {
      setActiveQuizQuestion((prev) => prev + 1);
      setSelectedOption(null);
      setQuizAnswered(false);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-in fade-in duration-200">
      
      {/* Top Banner with Streak Flame */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Good afternoon, Nathan <span className="text-xl">👋</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            JSS 2A • Royal Gateway Academy • Ready to level up your scores today?
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Streak badge */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl">
            <Flame className="w-5 h-5 text-orange-500 fill-orange-500 animate-bounce" />
            <div>
              <p className="text-xs font-extrabold text-orange-700">7-Day Study Streak!</p>
              <p className="text-[10px] text-amber-600 font-medium">Top 5% of JSS 2</p>
            </div>
          </div>

          <button
            onClick={() => onOpenModal('report_card')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm shadow-indigo-200 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>My Report Card</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Term Average */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div className="mt-3">
            <p className="text-xs font-medium text-slate-500">Current Average</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-0.5">74%</p>
            <p className="text-[11px] text-indigo-600 font-semibold mt-0.5">
              Goal for term: 85%
            </p>
          </div>
        </div>

        {/* Card 2: Completed Assessments */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div className="mt-3">
            <p className="text-xs font-medium text-slate-500">Completed Assessments</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-0.5">14 / 16</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">
              88% completed
            </p>
          </div>
        </div>

        {/* Card 3: Pending Homework */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div className="mt-3">
            <p className="text-xs font-medium text-slate-500">Assignments Due</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-0.5">2 Tasks</p>
            <p className="text-[11px] text-amber-600 font-semibold mt-0.5">
              Math & English this Friday
            </p>
          </div>
        </div>

        {/* Card 4: Trophies & Badges */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Trophy className="w-6 h-6" />
          </div>
          <div className="mt-3">
            <p className="text-xs font-medium text-slate-500">Achievements</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-0.5">8 Badges</p>
            <p className="text-[11px] text-purple-600 font-semibold mt-0.5">
              Math Champion, 100% Attendance
            </p>
          </div>
        </div>

      </div>

      {/* Row 2: Interactive AI Quiz / Practice Studio + Upcoming Assessments */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Interactive AI Practice Card (8 cols) */}
        <div className="lg:col-span-8 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          
          {/* Ambient Glow */}
          <div className="absolute -right-10 -top-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Daily Practice Challenge</span>
              </span>
              <span className="text-xs text-slate-400">
                Question {activeQuizQuestion + 1} of {practiceQuestions.length}
              </span>
            </div>

            <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>+20 XP</span>
            </div>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-white mb-5 leading-snug">
            {practiceQuestions[activeQuizQuestion].question}
          </h2>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            {practiceQuestions[activeQuizQuestion].options.map((opt) => {
              const isSelected = selectedOption === opt;
              const isCorrect = opt === practiceQuestions[activeQuizQuestion].correct;

              let btnStyle = 'bg-white/10 hover:bg-white/15 border-white/10 text-white';
              if (quizAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-500/30 border-emerald-400 text-emerald-200 font-bold';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-500/30 border-rose-400 text-rose-200';
                }
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleSelectOption(opt)}
                  disabled={quizAnswered}
                  className={`p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all ${btnStyle}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Feedback & Next Button */}
          {quizAnswered && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-150">
              <div>
                <p className={`text-xs font-bold ${
                  selectedOption === practiceQuestions[activeQuizQuestion].correct ? 'text-emerald-300' : 'text-rose-300'
                }`}>
                  {selectedOption === practiceQuestions[activeQuizQuestion].correct
                    ? '🎉 Correct! Brilliant step solving.'
                    : '💡 Solution breakdown:'}
                </p>
                <p className="text-xs text-slate-300 mt-0.5">
                  {practiceQuestions[activeQuizQuestion].explanation}
                </p>
              </div>

              {activeQuizQuestion < practiceQuestions.length - 1 ? (
                <button
                  onClick={nextQuestion}
                  className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md transition-colors whitespace-nowrap self-end sm:self-center"
                >
                  Next Question →
                </button>
              ) : (
                <button
                  onClick={() => {
                    setActiveQuizQuestion(0);
                    setSelectedOption(null);
                    setQuizAnswered(false);
                  }}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md transition-colors whitespace-nowrap self-end sm:self-center"
                >
                  Restart Practice 🔄
                </button>
              )}
            </div>
          )}

        </div>

        {/* Right: Upcoming Assessments (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">Upcoming Timetable</h3>
              <span className="text-xs font-semibold text-indigo-600">This Week</span>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-100">
                <p className="text-xs font-bold text-slate-900">JSS 2A Math Quiz 3</p>
                <p className="text-[11px] text-slate-500">Tomorrow • 8:00 AM in Room 12</p>
                <span className="inline-block mt-1 text-[10px] font-bold text-indigo-600 bg-white px-2 py-0.5 rounded-md border border-indigo-200">
                  SmartMark OMR Sheet Test
                </span>
              </div>

              <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-100">
                <p className="text-xs font-bold text-slate-900">English Essay Submission</p>
                <p className="text-[11px] text-slate-500">Friday • 11:30 AM</p>
                <span className="inline-block mt-1 text-[10px] font-bold text-purple-600 bg-white px-2 py-0.5 rounded-md border border-purple-200">
                  Continuous Assessment 2
                </span>
              </div>

              <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100">
                <p className="text-xs font-bold text-slate-900">Basic Science Lab Practical</p>
                <p className="text-[11px] text-slate-500">Next Monday • 9:00 AM</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => onOpenModal('result_checker')}
            className="w-full pt-3 border-t border-slate-100 text-xs font-semibold text-indigo-600 hover:underline text-center"
          >
            Check Past Exam Results →
          </button>
        </div>

      </div>

    </div>
  );
};
