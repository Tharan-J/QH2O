"use client";

import { useState } from "react";
import { Settings, CheckCircle, RefreshCcw, Droplet, ArrowRight, Play, Check } from "lucide-react";
import clsx from "clsx";

export default function CalibrationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSyncing, setIsSyncing] = useState(false);
  const [accuracy, setAccuracy] = useState<number | null>(null);

  const steps = [
    {
      step: 1,
      title: "Prepare Solution A",
      desc: "Insert the pH/ORP probe into the 4.01 Buffer Calibration Solution.",
      actionText: "Probe Inserted",
      icon: Droplet,
      color: "text-rose-500",
      bgColor: "bg-rose-500",
      borderColor: "border-rose-200"
    },
    {
      step: 2,
      title: "Synchronize Baseline",
      desc: "Establish baseline telemetry. Do not agitate the probe during this sequence.",
      actionText: "Sync Now",
      icon: RefreshCcw,
      color: "text-amber-500",
      bgColor: "bg-amber-500",
      borderColor: "border-amber-200"
    },
    {
      step: 3,
      title: "Rinse Sensor Array",
      desc: "Rinse the probe thoroughly cross-contamination with Deionized (DI) water.",
      actionText: "Rinse Completed",
      icon: Droplet,
      color: "text-sky-500",
      bgColor: "bg-sky-500",
      borderColor: "border-sky-200"
    },
    {
      step: 4,
      title: "Second Point Calibration",
      desc: "Insert into 7.00 Buffer Solution and initiate final parameter lock.",
      actionText: "Lock Calibration",
      icon: CheckCircle,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500",
      borderColor: "border-emerald-200"
    }
  ];

  const handleAction = () => {
    if (currentStep === 2 || currentStep === 4) {
      setIsSyncing(true);
      setTimeout(() => {
        setIsSyncing(false);
        if (currentStep === 4) setAccuracy(99.6);
        else setCurrentStep(prev => prev + 1);
      }, 2000);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setAccuracy(null);
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 flex items-center gap-3">
            <Settings className="w-10 h-10 text-slate-400" /> Sensor Calibration
          </h1>
          <p className="text-xl text-slate-500 font-medium mt-3">Maintain lab-grade accuracy across your deployed arrays.</p>
        </div>

        <div className="bg-white px-6 py-3 rounded-full border border-slate-200 shadow-sm flex items-center gap-3 font-bold text-sm">
          <span className="text-slate-400 uppercase tracking-widest text-[10px]">Target Device:</span>
          <span className="text-slate-900 bg-slate-100 px-3 py-1 rounded-md tracking-widest font-mono">QH2O-114</span>
        </div>
      </div>

      {accuracy !== null ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-[3rem] p-12 flex flex-col items-center justify-center text-center shadow-xl shadow-emerald-500/10">
          <div className="w-24 h-24 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/40 mb-8 animate-bounce">
            <CheckCircle className="w-12 h-12" />
          </div>
          <h2 className="text-5xl font-black text-emerald-800 tracking-tighter mb-4">Calibration Locked</h2>
          <p className="text-xl text-emerald-700/80 font-medium mb-8 max-w-lg">
            Device QH2O-114 has been successfully synchronized and validated against ISO metrics.
          </p>
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-emerald-100 w-full max-w-sm mb-8">
            <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Final Accuracy Variance</div>
            <div className="text-6xl font-black text-emerald-600 tracking-tighter">{accuracy}%</div>
          </div>
          <button onClick={handleReset} className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
            Finish <Check className="w-5 h-5"/>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Progress Timeline Indicator */}
          <div className="col-span-1 md:col-span-4 flex items-center justify-between mb-8 relative px-4">
             <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -z-10 rounded-full"></div>
             {steps.map((s, idx) => (
                <div key={s.step} className={clsx("relative flex flex-col items-center transition-all", currentStep >= s.step ? "opacity-100" : "opacity-40 grayscale")}>
                  <div className={clsx(
                    "w-12 h-12 rounded-full flex items-center justify-center text-white border-4 font-bold text-lg mb-3 transition-colors shadow-lg",
                    currentStep >= s.step ? s.bgColor + " border-white" : "bg-slate-300 border-slate-100"
                  )}>
                    {s.step}
                  </div>
                  <span className={clsx("text-xs font-black uppercase tracking-widest text-center max-w-[80px]", currentStep >= s.step ? "text-slate-900" : "text-slate-400")}>
                     Phase {s.step}
                  </span>
                </div>
             ))}
          </div>

          {/* Active Step Content */}
          <div className="col-span-1 md:col-span-4 bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center gap-12 min-h-[400px]">
            {steps.map((s) => currentStep === s.step && (
              <div key={s.step} className="w-full flex flex-col md:flex-row items-center gap-12 animate-in slide-in-from-right-16 fade-in duration-500">
                <div className="flex-1 space-y-6 text-center md:text-left">
                  <span className={clsx("text-sm font-black uppercase tracking-widest px-4 py-1.5 rounded-full", "bg-slate-100 text-slate-600")}>
                    Step 0{s.step} of 04
                  </span>
                  <h2 className="text-5xl font-black tracking-tighter text-slate-900 leading-[1.1]">
                    {s.title}
                  </h2>
                  <p className="text-2xl text-slate-500 leading-relaxed font-medium">
                    {s.desc}
                  </p>
                </div>
                
                <div className="flex flex-col items-center shrink-0">
                  <div className={clsx("w-48 h-48 rounded-full border-8 flex items-center justify-center relative shadow-[0_20px_50px_rgba(0,0,0,0.1)]", s.borderColor, s.bgColor + "/10")}>
                    {isSyncing ? (
                       <RefreshCcw className={clsx("w-20 h-20 animate-spin", s.color)} />
                    ) : (
                       <s.icon className={clsx("w-20 h-20", s.color)} />
                    )}
                    
                    {/* Pulsing ring during sync */}
                    {isSyncing && <div className={clsx("absolute inset-0 rounded-full animate-ping opacity-30", s.bgColor)}></div>}
                  </div>

                  <button 
                    onClick={handleAction} 
                    disabled={isSyncing}
                    className={clsx(
                      "mt-10 px-10 py-5 font-bold text-xl rounded-2xl shadow-xl transition-all flex items-center gap-3 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
                      "bg-slate-900 text-white hover:bg-slate-800"
                    )}
                  >
                    {isSyncing ? "Establishing..." : s.actionText}
                    {!isSyncing && <ArrowRight className="w-6 h-6" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
