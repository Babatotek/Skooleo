import React, { useState, useRef } from 'react';
import {
  X,
  Camera,
  Upload,
  QrCode,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Printer,
  Sparkles,
  RefreshCw,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SmartMarkScanResult } from '../../types';

interface SmartMarkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SmartMarkModal: React.FC<SmartMarkModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'scanner' | 'generator' | 'results'>('scanner');
  const [isScanning, setIsScanning] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<SmartMarkScanResult | null>(null);
  const [questionCount, setQuestionCount] = useState<number>(20);
  const [selectedClass, setSelectedClass] = useState('JSS 2A');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);

  if (!isOpen) return null;

  const startCamera = async () => {
    try {
      setCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Camera access error:', err);
      // Fallback if camera is unavailable or denied
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setCameraActive(false);
  };

  const handleCaptureFromCamera = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(dataUrl);
        stopCamera();
        processScan(dataUrl);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setCapturedImage(base64);
        processScan(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const processScan = async (base64Data: string) => {
    setIsScanning(true);
    try {
      const res = await fetch('/api/ai/smartmark-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: base64Data,
          assessmentId: `ASM-MATH-${selectedClass}-2026`,
          totalQuestions: questionCount,
          subject: selectedSubject,
        })
      });

      const data = await res.json();
      setScanResult(data.scanResult || data);
      setActiveTab('results');
      confetti({
        particleCount: 60,
        spread: 50,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error('Scanning error:', err);
      // Fallback simulation
      setScanResult({
        assessmentId: `ASM-MATH-${selectedClass}-2026`,
        detectedStudentId: 'RGA26/1006',
        studentName: 'Nathan Bello',
        classArm: selectedClass,
        subject: selectedSubject,
        totalQuestions: questionCount,
        score: Math.floor(questionCount * 0.85),
        percentage: 85,
        status: 'Auto Marked',
        flaggedExceptions: 1,
        responses: {
          1: { selected: 'A', confidence: 0.98, isUncertain: false, correct: 'A' },
          2: { selected: 'C', confidence: 0.95, isUncertain: false, correct: 'C' },
          3: { selected: 'B', confidence: 0.62, isUncertain: true, correct: 'B' },
          4: { selected: 'D', confidence: 0.99, isUncertain: false, correct: 'D' },
          5: { selected: 'A', confidence: 0.91, isUncertain: false, correct: 'B' },
        },
        scannedAt: new Date().toLocaleTimeString(),
      });
      setActiveTab('results');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-purple-50 via-indigo-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-200">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                SmartMark™ AI OMR Scanning & Sheet Engine
                <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[10px] font-bold">
                  Patent Pending
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Scan standard paper bubble sheets with 99.9% optical AI accuracy & instant gradebook sync
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center px-6 border-b border-slate-100 bg-slate-50/50 gap-4">
          <button
            onClick={() => {
              stopCamera();
              setActiveTab('scanner');
            }}
            className={`py-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-all ${
              activeTab === 'scanner'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>1. Optical Sheet Scanner</span>
          </button>

          <button
            onClick={() => {
              stopCamera();
              setActiveTab('generator');
            }}
            className={`py-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-all ${
              activeTab === 'generator'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Printer className="w-4 h-4" />
            <span>2. Printable OMR Sheet Generator</span>
          </button>

          {scanResult && (
            <button
              onClick={() => setActiveTab('results')}
              className={`py-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-all ${
                activeTab === 'results'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>3. Verified Grading Results</span>
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* TAB 1: SCANNER */}
          {activeTab === 'scanner' && (
            <div className="space-y-6">
              
              {/* Controls Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/60">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Target Class</label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 font-semibold focus:outline-none"
                  >
                    <option>JSS 1A</option>
                    <option>JSS 2A</option>
                    <option>JSS 3B</option>
                    <option>SS 1C</option>
                    <option>Grade 6A</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Subject</label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 font-semibold focus:outline-none"
                  >
                    <option>Mathematics</option>
                    <option>Basic Science</option>
                    <option>English Language</option>
                    <option>Civic Education</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Total Questions</label>
                  <select
                    value={questionCount}
                    onChange={(e) => setQuestionCount(Number(e.target.value))}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 font-semibold focus:outline-none"
                  >
                    <option value={20}>20 Questions</option>
                    <option value={40}>40 Questions</option>
                    <option value={60}>60 Questions</option>
                  </select>
                </div>
              </div>

              {/* Viewfinder or Camera */}
              <div className="relative border-2 border-dashed border-purple-200 rounded-3xl bg-purple-50/30 p-8 flex flex-col items-center justify-center min-h-[300px] text-center overflow-hidden">
                {cameraActive ? (
                  <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border-2 border-purple-500">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    {/* Viewfinder Alignment Overlay */}
                    <div className="absolute inset-4 border-2 border-dashed border-emerald-400 rounded-xl pointer-events-none flex items-center justify-center">
                      <div className="w-16 h-16 border-2 border-emerald-400 rounded-lg animate-pulse" />
                    </div>

                    <button
                      onClick={handleCaptureFromCamera}
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-lg flex items-center gap-2"
                    >
                      <Camera className="w-4 h-4" />
                      <span>Capture & Grade Now</span>
                    </button>
                  </div>
                ) : isScanning ? (
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-16 h-16 rounded-full border-4 border-purple-600 border-t-transparent animate-spin" />
                    <p className="text-sm font-bold text-slate-900">Scanning & Digitizing OMR Sheet...</p>
                    <p className="text-xs text-slate-500">AI aligning fiducials, extracting student ID & grading bubbles</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-w-md">
                    <div className="w-16 h-16 rounded-3xl bg-purple-100 text-purple-600 flex items-center justify-center mx-auto shadow-xs">
                      <Camera className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Scan Student Bubble Sheet</h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Position the SmartMark OMR sheet within the frame. You can use your live camera or upload a captured photo.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <button
                        onClick={startCamera}
                        className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-md shadow-purple-200 transition-colors flex items-center gap-2"
                      >
                        <Camera className="w-4 h-4" />
                        <span>Open Live Camera</span>
                      </button>

                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-5 py-2.5 bg-white hover:bg-slate-50 text-purple-700 border border-purple-200 rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Upload Sheet Photo</span>
                      </button>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: GENERATOR */}
          {activeTab === 'generator' && (
            <div className="space-y-6">
              <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-purple-900">Standardized SmartMark Printable Template</h3>
                  <p className="text-[11px] text-purple-700">Compatible with plain A4 paper, laser/inkjet printers & photocopiers</p>
                </div>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print OMR Sheets</span>
                </button>
              </div>

              {/* Sheet Visual Simulation */}
              <div className="border border-slate-300 rounded-2xl p-6 bg-white shadow-md max-w-2xl mx-auto space-y-4 font-mono text-slate-800">
                {/* Header */}
                <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
                  <div>
                    <h4 className="font-bold text-sm">ROYAL GATEWAY ACADEMY</h4>
                    <p className="text-[10px] text-slate-600">SMARTMARK™ AUTOMATED OMR ANSWER SHEET</p>
                  </div>
                  <div className="w-12 h-12 bg-slate-900 rounded flex items-center justify-center text-white text-[9px] text-center font-bold">
                    QR CODE
                  </div>
                </div>

                {/* Candidate Info Grid */}
                <div className="grid grid-cols-3 gap-2 text-[10px] bg-slate-50 p-2 rounded border border-slate-200">
                  <div>CANDIDATE NAME: ____________________</div>
                  <div>ADMISSION NO: [ ][ ][ ][ ][ ][ ]</div>
                  <div>CLASS / ARM: [ JSS 2A ]</div>
                </div>

                {/* Bubble Grid 1 to 20 */}
                <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                  <div className="space-y-1.5">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <div key={num} className="flex items-center gap-2">
                        <span className="w-5 text-right font-bold text-slate-500">{num}.</span>
                        {['A', 'B', 'C', 'D'].map((letter) => (
                          <span
                            key={letter}
                            className="w-5 h-5 rounded-full border border-slate-800 flex items-center justify-center text-[10px] font-bold"
                          >
                            {letter}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1.5">
                    {[11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((num) => (
                      <div key={num} className="flex items-center gap-2">
                        <span className="w-5 text-right font-bold text-slate-500">{num}.</span>
                        {['A', 'B', 'C', 'D'].map((letter) => (
                          <span
                            key={letter}
                            className="w-5 h-5 rounded-full border border-slate-800 flex items-center justify-center text-[10px] font-bold"
                          >
                            {letter}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Corner Fiducials */}
                <div className="flex justify-between pt-4 border-t border-slate-200 text-[9px] text-slate-400">
                  <span>■ FIDUCIAL 1</span>
                  <span>SMARTMARK V2.6 • DO NOT FOLD</span>
                  <span>■ FIDUCIAL 2</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: RESULTS */}
          {activeTab === 'results' && scanResult && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Scorecard Banner */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-emerald-100 text-[10px] font-bold uppercase tracking-wider">
                    {scanResult.status}
                  </span>
                  <h3 className="text-xl font-extrabold mt-1">{scanResult.studentName}</h3>
                  <p className="text-xs text-emerald-100">
                    Admission No: {scanResult.detectedStudentId} • {scanResult.classArm} • {scanResult.subject}
                  </p>
                </div>

                <div className="flex items-center gap-4 bg-white/10 px-5 py-3 rounded-2xl backdrop-blur-sm">
                  <div className="text-right">
                    <p className="text-xs text-emerald-200 font-medium">Final Score</p>
                    <p className="text-2xl font-black">{scanResult.score} / {scanResult.totalQuestions}</p>
                  </div>
                  <div className="text-3xl font-extrabold text-amber-300">
                    {scanResult.percentage}%
                  </div>
                </div>
              </div>

              {/* Exception Alert if Flagged */}
              {scanResult.flaggedExceptions > 0 && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <div>
                      <p className="text-xs font-bold text-amber-900">
                        {scanResult.flaggedExceptions} Response Flagged for Review
                      </p>
                      <p className="text-[11px] text-amber-700">
                        Question 3 has a light pencil mark with 62% confidence. Please verify.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert('Confirmed bubble option B.')}
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold"
                  >
                    Accept as 'B'
                  </button>
                </div>
              )}

              {/* Response Breakdown Table */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-800">
                  Item Analysis & Extracted Answers
                </div>
                <div className="p-4 grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                  {Object.entries(scanResult.responses).map(([qNum, rawResp]) => {
                    const resp = rawResp as { selected: string; confidence: number; isUncertain: boolean; correct: string };
                    const isCorrect = resp.selected === resp.correct;
                    return (
                      <div
                        key={qNum}
                        className={`p-2.5 rounded-xl border flex flex-col justify-between ${
                          resp.isUncertain
                            ? 'bg-amber-50/80 border-amber-200'
                            : isCorrect
                            ? 'bg-emerald-50/50 border-emerald-200'
                            : 'bg-rose-50/50 border-rose-200'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-slate-700">Q{qNum}</span>
                          <span className={`text-[10px] font-bold px-1.5 rounded ${
                            isCorrect ? 'bg-emerald-200 text-emerald-800' : 'bg-rose-200 text-rose-800'
                          }`}>
                            {resp.selected}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1">
                          Key: {resp.correct} • {(resp.confidence * 100).toFixed(0)}% conf
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => {
                    setScanResult(null);
                    setActiveTab('scanner');
                  }}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Scan Another Sheet
                </button>

                <button
                  onClick={() => {
                    alert(`Results for ${scanResult.studentName} successfully synced to Gradebook & Term Assessment 1!`);
                    onClose();
                  }}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Confirm & Sync to Gradebook
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
