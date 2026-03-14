"use client";

import { use, useState } from "react";
import { ArrowLeft, BrainCircuit, Droplet, Activity, ShieldCheck, AlertTriangle, ArrowUpRight, ArrowDownRight, Wind, X } from "lucide-react";
import Link from "next/link";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

// WHO Thresholds Logic
const WHOLogic = {
  pH: { min: 6.5, max: 8.5 },
  tds: { max: 500 }, // ppm
  turbidity: { max: 5 }, // NTU
  orp: { min: 650, max: 800 } // mV (typical for clean municipal water)
};

// Generate Mock 24hr History
const generateHistory = (base: number, variance: number, trend: 'up'|'down'|'stable') => {
  return Array.from({ length: 24 }).map((_, i) => {
    let val = base + (Math.random() * variance * 2 - variance);
    // Introduce artificial spikes for anomalous data viewing
    if (trend === 'up' && i === 18) val += variance * 5;
    if (trend === 'down' && i === 10) val -= variance * 5;
    if (trend === 'up') val += i * (variance / 10);
    if (trend === 'down') val -= i * (variance / 10);
    const hour = i.toString().padStart(2, '0');
    return { time: `${hour}:00`, value: Number(val.toFixed(1)) };
  });
};

export default function DeviceAnalysisPage({ params }: { params: Promise<{ id: string }> }) {
  // Using React.use to unwrap params
  const { id } = use(params);
  
  const [selectedMetric, setSelectedMetric] = useState<any>(null);

  // Mock checking if the device is safe
  const isTNK = id.includes("TNK");
  const isMED = id.includes("MED");
  const isLAB = id.includes("LAB");
  const isGRD = id.includes("GRD");
  const isUnsafe = id.includes("118") || id.includes("04") || id.includes("UNSAFE") || isTNK;

  let mockPrefs: any = {};
  if (isMED) mockPrefs = { tds: { max: 400 } };
  if (isLAB) mockPrefs = { pH: { max: 7.8 } };
  if (isGRD) mockPrefs = { turbidity: { max: 10 } };
  
  // Set mock current values based on safe/unsafe or specific mocked devices
  let currentData = {
    pH: isUnsafe ? 9.2 : 7.2,
    tds: isUnsafe ? 850 : 310,
    turbidity: isUnsafe ? 8.4 : 0.9,
    orp: isUnsafe ? 400 : 710,
  };
  
  if (isTNK) currentData = { pH: 6.4, tds: 1100, turbidity: 12.0, orp: 210 };
  else if (isMED) currentData = { pH: 7.2, tds: 480, turbidity: 0.9, orp: 710 }; // TDS exceeds user pref
  else if (isLAB) currentData = { pH: 7.9, tds: 280, turbidity: 0.5, orp: 720 }; // pH exceeds user pref
  else if (isGRD) currentData = { pH: 7.1, tds: 350, turbidity: 12.0, orp: 600 }; // turbidity exceeds user pref

  const riskScore = isTNK ? 48 : (isUnsafe ? 32 : 92);
  const status = isUnsafe ? "NOT DRINKABLE" : "DRINKABLE";

  const metrics = [
    {
      id: "pH",
      name: "pH Level",
      value: currentData.pH,
      unit: "",
      safe: currentData.pH >= WHOLogic.pH.min && currentData.pH <= WHOLogic.pH.max,
      userSafe: mockPrefs.pH ? !(mockPrefs.pH.min && currentData.pH < mockPrefs.pH.min) && !(mockPrefs.pH.max && currentData.pH > mockPrefs.pH.max) : true,
      prefDef: mockPrefs.pH || null,
      trend: isUnsafe ? "down" : "stable",
      icon: Droplet,
      history: generateHistory(currentData.pH, 0.2, isUnsafe ? 'down' : 'stable')
    },
    {
      id: "tds",
      name: "TDS",
      value: currentData.tds,
      unit: "ppm",
      safe: currentData.tds <= WHOLogic.tds.max,
      userSafe: mockPrefs.tds ? !(mockPrefs.tds.min && currentData.tds < mockPrefs.tds.min) && !(mockPrefs.tds.max && currentData.tds > mockPrefs.tds.max) : true,
      prefDef: mockPrefs.tds || null,
      trend: isUnsafe ? "up" : "stable",
      icon: Activity,
      history: generateHistory(currentData.tds, 10, isUnsafe ? 'up' : 'stable')
    },
    {
      id: "turbidity",
      name: "Turbidity",
      value: currentData.turbidity,
      unit: "NTU",
      safe: currentData.turbidity <= WHOLogic.turbidity.max,
      userSafe: mockPrefs.turbidity ? !(mockPrefs.turbidity.min && currentData.turbidity < mockPrefs.turbidity.min) && !(mockPrefs.turbidity.max && currentData.turbidity > mockPrefs.turbidity.max) : true,
      prefDef: mockPrefs.turbidity || null,
      trend: isUnsafe ? "up" : "down",
      icon: Wind,
      history: generateHistory(currentData.turbidity, 0.5, isUnsafe ? 'up' : 'down')
    },
    {
      id: "orp",
      name: "ORP",
      value: currentData.orp,
      unit: "mV",
      safe: currentData.orp >= WHOLogic.orp.min && currentData.orp <= WHOLogic.orp.max,
      userSafe: mockPrefs.orp ? !(mockPrefs.orp.min && currentData.orp < mockPrefs.orp.min) && !(mockPrefs.orp.max && currentData.orp > mockPrefs.orp.max) : true,
      prefDef: mockPrefs.orp || null,
      trend: isUnsafe ? "down" : "up",
      icon: Activity,
      history: generateHistory(currentData.orp, 20, isUnsafe ? 'down' : 'up')
    }
  ];

  const getRiskColor = (score: number) => {
    if (score >= 90) return { stroke: "#10b981", text: "text-emerald-500", bg: "bg-emerald-500" };
    if (score >= 70) return { stroke: "#f59e0b", text: "text-amber-500", bg: "bg-amber-500" };
    if (score >= 40) return { stroke: "#f97316", text: "text-orange-500", bg: "bg-orange-500" };
    return { stroke: "#f43f5e", text: "text-rose-500", bg: "bg-rose-500" };
  };

  const riskVisuals = getRiskColor(riskScore);
  const gaugePercent = riskScore;
  const circumference = 2 * Math.PI * 80;
  const strokeDashoffset = circumference - (gaugePercent / 100) * circumference;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      
      {/* Header with Back Button */}
      <div className="flex items-center gap-6 mb-8">
        <button onClick={() => window.history.back()} className="w-12 h-12 flex items-center justify-center bg-white rounded-full border border-slate-200 shadow-sm text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all shrink-0">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <div className="flex items-center gap-3">
             <h1 className="text-4xl font-black tracking-tighter text-slate-900">{id} Device Log</h1>
             <span className="px-3 py-1 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-full">Live</span>
          </div>
          <p className="text-xl text-slate-500 font-medium mt-1">Detailed Sensor Analytics & AI Inference.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Status & AI */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* DRINKABLE STATUS CARD */}
          <div className={clsx(
            "rounded-[2.5rem] border shadow-2xl p-8 relative overflow-hidden flex flex-col items-center justify-center text-center min-h-[400px]",
            isUnsafe ? "bg-rose-50 border-rose-200 shadow-rose-500/10" : "bg-emerald-50 border-emerald-200 shadow-emerald-500/10"
          )}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
            
            <span className={clsx(
              "text-sm font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-8",
              isUnsafe ? "bg-rose-500/10 text-rose-700" : "bg-emerald-500/10 text-emerald-700"
            )}>
              WHO Potability Engine
            </span>

            <div className="relative w-48 h-48 mb-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="12" fill="none" className="text-slate-200 opacity-50" />
                <circle cx="100" cy="100" r="80" stroke={riskVisuals.stroke} strokeWidth="12" fill="none" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} className="transition-all duration-1000 ease-out" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={clsx("text-5xl font-black tracking-tighter", riskVisuals.text)}>{riskScore}</span>
                <span className="text-slate-400 font-bold text-sm">/ 100</span>
              </div>
            </div>

            <h2 className={clsx("text-4xl font-black tracking-tighter leading-none mb-3", riskVisuals.text)}>
              {status}
            </h2>
            
            <p className={clsx("text-lg font-bold px-4", isUnsafe ? "text-rose-800/80" : "text-emerald-800/80")}>
              {isUnsafe ? "Turbidity and TDS above safe thresholds." : "All parameters within safe limits."}
            </p>
          </div>

          {/* AI INSIGHTS PANEL */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.3)]">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-sky-500/20 rounded-full blur-2xl"></div>
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-12 h-12 bg-sky-500/20 rounded-xl flex items-center justify-center text-sky-400">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black tracking-tight">AI Insight</h3>
            </div>
            
            <div className="space-y-6 relative z-10">
              <div>
                <p className="text-slate-300 text-lg leading-relaxed font-medium">
                  {isUnsafe 
                    ? "Turbidity and TDS increased sharply after recent rainfall data. Water likely contains suspended agricultural runoff and sediments."
                    : (isMED || isLAB || isGRD) ? "Water is within WHO drinking water limits, but exceeds the user's preferred threshold for specific operations." 
                    : "Stable readings across the board. No correlation found with recent regional pipeline flushing. Water chemistry is balanced."}
                </p>
              </div>
              
              <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5">
                <div className="text-sky-400 font-bold text-xs uppercase tracking-widest mb-2">Recommendation</div>
                <p className="text-white font-bold leading-tight">
                  {isUnsafe 
                    ? "Allow settling and boil water before consumption. Discontinue direct intake immediately." 
                    : (isMED || isLAB || isGRD) ? "Monitor closely. Adjust specialized treatment processes to bring parameters within preferred tolerance."
                    : "Safe for standard consumption and industrial use."}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Detailed Metrics */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight pl-2 flex items-center gap-2">
            24h Sensor Telemetry
            <span className="text-sm font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-full">Click cards for deep analysis</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {metrics.map((metric, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-shadow relative overflow-hidden group cursor-pointer"
                onClick={() => setSelectedMetric(metric)}
              >
                
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-slate-50 text-slate-400 rounded-xl border border-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                      <metric.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-600 uppercase tracking-widest text-xs">{metric.name}</h4>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-4xl font-black tracking-tighter text-slate-900 leading-none">{metric.value}</span>
                        <span className="font-bold text-slate-400">{metric.unit}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={clsx(
                    "px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-bold border",
                    metric.safe ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-rose-50 text-rose-700 border-rose-100"
                  )}>
                    <span className={clsx("w-2 h-2 rounded-full animate-pulse", metric.safe ? "bg-emerald-500" : "bg-rose-500")} />
                    WHO: {metric.safe ? "Safe" : "Unsafe"}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                    <span>WHO Limit:</span>
                    <span>{((WHOLogic as any)[metric.id].min ?? 0)} – {((WHOLogic as any)[metric.id].max ?? 'No max')} {metric.unit}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                    <span>User Limit:</span>
                    <span className={clsx("px-2 py-0.5 rounded uppercase", metric.prefDef ? "bg-slate-200 text-slate-700" : "text-slate-400 font-medium")}>
                      {metric.prefDef ? `${metric.prefDef.min ?? 0} – ${metric.prefDef.max ?? 'No max'} ${metric.unit}` : "Default (WHO)"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4 relative z-10 flex-wrap">
                  {metric.trend === 'up' && <span className="flex items-center text-rose-500 font-bold text-sm bg-rose-50 px-2 py-0.5 rounded-md"><ArrowUpRight className="w-4 h-4 mr-1"/> Trending up</span>}
                  {metric.trend === 'down' && <span className="flex items-center text-rose-500 font-bold text-sm bg-rose-50 px-2 py-0.5 rounded-md"><ArrowDownRight className="w-4 h-4 mr-1"/> Trending down</span>}
                  {metric.trend === 'stable' && <span className="flex items-center text-slate-500 font-bold text-sm bg-slate-50 px-2 py-0.5 rounded-md">Stable</span>}
                  
                  {!metric.userSafe && (
                    <span className="flex items-center text-orange-600 font-bold text-sm bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-md ml-auto">
                      <AlertTriangle className="w-4 h-4 mr-1"/> Above Pref Limit
                    </span>
                  )}
                </div>

                <div className="h-32 w-full mt-auto relative z-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={metric.history} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id={`color\${idx}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={metric.safe ? "#10b981" : "#f43f5e"} stopOpacity={0.2} />
                          <stop offset="95%" stopColor={metric.safe ? "#10b981" : "#f43f5e"} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke={metric.safe ? "#10b981" : "#f43f5e"} 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill={`url(#color\${idx})`} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Metric Analysis Modal */}
      <AnimatePresence>
        {selectedMetric && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setSelectedMetric(null)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-4xl relative z-10 overflow-hidden flex flex-col md:flex-row min-h-[500px]"
            >
               {/* Left side Graph */}
               <div className="flex-1 p-8 bg-slate-50 border-r border-slate-100 flex flex-col">
                 <div className="flex justify-between items-start mb-8">
                   <div className="flex items-center gap-3">
                     <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center text-slate-400">
                       <selectedMetric.icon className="w-6 h-6" />
                     </div>
                     <div>
                       <h2 className="text-2xl font-black text-slate-900">{selectedMetric.name} Telemetry</h2>
                       <p className="text-slate-500 font-medium">Detailed 24-hour continuous stream</p>
                     </div>
                   </div>
                   <button 
                     onClick={() => setSelectedMetric(null)}
                     className="md:hidden w-10 h-10 flex items-center justify-center bg-white rounded-full text-slate-500 border border-slate-200"
                   >
                     <X className="w-5 h-5" />
                   </button>
                 </div>

                 <div className="flex-1 min-h-[300px] w-full mt-auto">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={selectedMetric.history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="modalGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={selectedMetric.safe ? "#10b981" : "#f43f5e"} stopOpacity={0.4} />
                            <stop offset="95%" stopColor={selectedMetric.safe ? "#10b981" : "#f43f5e"} stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="time" tick={{ fontSize: 12, fontWeight: 'bold', fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 12, fontWeight: 'bold', fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                        <Tooltip 
                          contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.15)', fontWeight: 'bold' }}
                          itemStyle={{ color: '#0f172a' }}
                          labelFormatter={(label) => `Time: ${label}`}
                          formatter={(value) => [`${value} ${selectedMetric.unit}`, "Reading"]}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke={selectedMetric.safe ? "#10b981" : "#f43f5e"} 
                          strokeWidth={4}
                          fillOpacity={1} 
                          fill="url(#modalGrad)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                 </div>
               </div>

               {/* Right side AI insights panel */}
               <div className="w-full md:w-80 bg-slate-900 text-white p-8 flex flex-col relative overflow-hidden shrink-0">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-sky-500/20 rounded-full blur-2xl pointer-events-none"></div>
                  
                  <div className="flex items-center gap-3 mb-6 relative z-10">
                    <BrainCircuit className="w-8 h-8 text-sky-400" />
                    <h3 className="text-xl font-black tracking-tight">AI Analysis</h3>
                  </div>

                  <div className="space-y-6 flex-1 relative z-10">
                     <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
                        <div className="text-xs uppercase tracking-widest font-black text-slate-400 mb-1">Current State</div>
                        <div className="flex items-baseline gap-1">
                           <span className="text-4xl font-black text-white">{selectedMetric.value}</span>
                           <span className="font-bold text-slate-400">{selectedMetric.unit}</span>
                        </div>
                     </div>

                     <div className="space-y-4">
                        <div className="text-sm uppercase tracking-widest font-bold text-sky-400">Detected Pattern</div>
                        <p className="text-slate-300 font-medium leading-relaxed">
                          {selectedMetric.name === "Turbidity" && selectedMetric.trend === "up" 
                            ? "Sudden turbidity spike detected at 02:30 AM. Possible sediment disturbance or pipeline flushing event."
                            : selectedMetric.name === "pH Level" && selectedMetric.trend === "down"
                            ? "pH drop observed between 10:00–11:00 AM. Possible acidic contamination or cleaning agent presence."
                            : selectedMetric.name === "TDS" && selectedMetric.trend === "up"
                            ? "Sharply elevated TDS discovered outside standard operational curves. Potential heavy metal runoff."
                            : "Baseline variations remain completely within anticipated tolerance parameters. No anomalies detected."
                          }
                        </p>
                     </div>
                  </div>

                  <button 
                    onClick={() => setSelectedMetric(null)}
                    className="mt-6 w-full py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors hidden md:block"
                  >
                    Close Analysis
                  </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
