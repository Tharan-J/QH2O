"use client";

import { useState } from "react";
import { GitCompare, Droplet, Activity, Wind, Database, BrainCircuit } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import clsx from "clsx";

const comparisonData = [
  {
    parameter: "pH",
    "Village Borewell": 7.2,
    "School Tap": 7.4,
    "River Intake": 8.5,
    "Village Tank": 8.1,
    unit: "pH",
    threshold: 8.5 // WHO Max
  },
  {
    parameter: "TDS",
    "Village Borewell": 310,
    "School Tap": 290,
    "River Intake": 850,
    "Village Tank": 620,
    unit: "ppm",
    threshold: 500 // WHO Max
  },
  {
    parameter: "Turbidity",
    "Village Borewell": 0.9,
    "School Tap": 0.5,
    "River Intake": 12.4,
    "Village Tank": 4.8,
    unit: "NTU",
    threshold: 5 // WHO Max
  },
  {
    parameter: "ORP",
    "Village Borewell": 710,
    "School Tap": 730,
    "River Intake": 320,
    "Village Tank": 480,
    unit: "mV",
    threshold: 650 // WHO Min
  }
];

const sourceScores: Record<string, number> = {
  "Village Borewell": 92,
  "School Tap": 96,
  "River Intake": 32,
  "Village Tank": 74
};

export default function CompareSourcesPage() {
  const [sourceA, setSourceA] = useState("School Tap");
  const [sourceB, setSourceB] = useState("Village Tank");

  const scoreA = sourceScores[sourceA];
  const scoreB = sourceScores[sourceB];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 flex items-center gap-3">
            <GitCompare className="w-10 h-10 text-sky-500" /> Source Comparison
          </h1>
          <p className="text-xl text-slate-500 font-medium mt-3">Contrast telemetry across two distinct water nodes.</p>
        </div>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">Baseline Source</span>
              <select 
                value={sourceA} 
                onChange={(e) => setSourceA(e.target.value)}
                className="text-2xl font-black text-slate-900 bg-transparent border-none focus:outline-none appearance-none cursor-pointer"
              >
                 <option>School Tap</option>
                 <option>Village Borewell</option>
                 <option>River Intake</option>
                 <option>Village Tank</option>
              </select>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                 <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Score</div>
                 <div className="text-xl font-black text-slate-900 leading-none">{scoreA} <span className="text-sm text-slate-400">/ 100</span></div>
              </div>
              <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center font-black">
                A
              </div>
            </div>
         </div>

         <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">Comparison Source</span>
              <select 
                value={sourceB} 
                onChange={(e) => setSourceB(e.target.value)}
                className="text-2xl font-black text-slate-900 bg-transparent border-none focus:outline-none appearance-none cursor-pointer"
              >
                 <option>Village Tank</option>
                 <option>River Intake</option>
                 <option>School Tap</option>
                 <option>Village Borewell</option>
              </select>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                 <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Score</div>
                 <div className="text-xl font-black text-slate-900 leading-none">{scoreB} <span className="text-sm text-slate-400">/ 100</span></div>
              </div>
              <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center font-black">
                B
              </div>
            </div>
         </div>
      </div>

      {/* Comparison Detailed Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {comparisonData.map((data, idx) => {
          
          const valA = data[sourceA as keyof typeof data] as number;
          const valB = data[sourceB as keyof typeof data] as number;
          
          let diff = valB - valA;
          let diffPercent = (diff / valA) * 100;

          // Simple chart data formulation
          const chartData = [
            { name: sourceA, value: valA, fill: "#10b981" },
            { name: sourceB, value: valB, fill: "#f43f5e" }
          ];

          return (
            <div key={idx} className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-shadow group">
              
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center">
                     {data.parameter === 'pH' && <Droplet className="w-5 h-5" />}
                     {data.parameter === 'TDS' && <Database className="w-5 h-5" />}
                     {data.parameter === 'Turbidity' && <Wind className="w-5 h-5" />}
                     {data.parameter === 'ORP' && <Activity className="w-5 h-5" />}
                   </div>
                   <h3 className="text-3xl font-black tracking-tighter text-slate-900">{data.parameter}</h3>
                 </div>
                 <div className="text-right">
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest block">WHO Limit</span>
                    <span className="text-lg font-black text-slate-900">{data.threshold} {data.unit}</span>
                 </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                {/* Source A Value */}
                <div className="flex-1 w-full p-6 bg-emerald-50 rounded-[2rem] border border-emerald-100 flex flex-col justify-center items-center text-center">
                   <span className="text-sm font-bold text-emerald-600/60 uppercase tracking-widest mb-1 line-clamp-1">{sourceA}</span>
                   <div className="text-5xl font-black text-emerald-700 tracking-tighter">{valA}</div>
                   <span className="text-emerald-600 font-bold mt-1">{data.unit}</span>
                </div>

                <div className="hidden md:flex flex-col items-center justify-center p-3 rounded-full bg-slate-100 shrink-0">
                  <span className="text-xs font-black text-slate-400">VS</span>
                </div>

                {/* Source B Value */}
                <div className="flex-1 w-full p-6 bg-rose-50 rounded-[2rem] border border-rose-100 flex flex-col justify-center items-center text-center">
                   <span className="text-sm font-bold text-rose-600/60 uppercase tracking-widest mb-1 line-clamp-1">{sourceB}</span>
                   <div className="text-5xl font-black text-rose-700 tracking-tighter">{valB}</div>
                   <span className="text-rose-600 font-bold mt-1">{data.unit}</span>
                </div>
              </div>

              {/* Side-by-side Visual Chart */}
              <div className="h-40 w-full mb-4">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                     <XAxis type="number" hide />
                     <YAxis dataKey="name" type="category" width={110} tick={{ fill: '#64748b', fontSize: 11, fontWeight: 'bold' }} axisLine={false} tickLine={false} />
                     <Tooltip 
                       contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                       itemStyle={{ color: '#0f172a' }}
                       formatter={(value: any) => [`${value} ${data.unit}`, 'Value']}
                     />
                     <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={24} />
                   </BarChart>
                 </ResponsiveContainer>
              </div>

              {/* Analytics Difference Footer */}
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 mt-6">
                <div className={clsx(
                  "px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-1 shrink-0",
                  diff > 0 ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"
                )}>
                  {Math.abs(diffPercent).toFixed(1)}% {diff > 0 ? "Higher" : "Lower"}
                </div>
                <span className="text-sm font-medium text-slate-500">
                   relative to baseline.
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Combined AI Insight Section below comparison */}
      <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-10 text-white relative overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.3)]">
         <div className="absolute right-0 top-0 w-64 h-64 bg-sky-500/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
         
         <div className="flex items-center gap-4 mb-6 relative z-10">
           <div className="w-14 h-14 bg-sky-500/20 rounded-2xl flex items-center justify-center text-sky-400">
             <BrainCircuit className="w-7 h-7" />
           </div>
           <div>
             <h3 className="text-3xl font-black tracking-tight">AI Differential Insight</h3>
             <p className="text-slate-400 font-medium mt-1">Comparing {sourceA} and {sourceB}</p>
           </div>
         </div>
         
         <div className="space-y-6 relative z-10 bg-slate-800/50 border border-slate-700 rounded-3xl p-6 md:p-8">
            <p className="text-slate-200 text-lg leading-relaxed font-medium">
              {sourceB === "Village Tank" && sourceA === "School Tap" ? 
                `${sourceB} turbidity is consistently higher than ${sourceA}. Likely due to sediment accumulation in storage tank.` :
              sourceB === "River Intake" ?
                `Major threshold violations across TDS and Turbidity in ${sourceB} compared to ${sourceA}. Indicates raw untreated source parameters.` :
              sourceA === "River Intake" ?
                `${sourceB} presents significantly improved metrics over raw ${sourceA}, suggesting active and successful filtration.` :
                `Telemetry variance between ${sourceA} and ${sourceB} remains consistent with expected local geology profiles.`
              }
            </p>
         </div>
      </div>

    </div>
  );
}
