"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ExternalLink, ShieldCheck, AlertTriangle, AlertCircle, Clock } from "lucide-react";
import clsx from "clsx";

export default function CommunityDashboard() {
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [userRole, setUserRole] = useState<string>("industry");
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRole = localStorage.getItem('userRole');
      if (storedRole === 'village' || storedRole === 'industry') {
        setUserRole(storedRole);
      }
    }
  }, []);

  const allDevices = [
    {
      id: "QH2O-MED-01",
      name: "Medical Centre Monitor",
      location: "Medical Centre",
      role: "industry",
      status: "DRINKABLE",
      score: 92,
      lastReading: "2 mins ago",
      x: 20,
      y: 35,
    },
    {
      id: "QH2O-OT-01",
      name: "Overtank Supply",
      location: "Overtank Outlet",
      role: "industry",
      status: "WARNING",
      score: 75,
      lastReading: "5 mins ago",
      x: 75,
      y: 20,
    },
    {
      id: "QH2O-HST-01",
      name: "Girls Hostel Monitor",
      location: "Girls Hostel Mess",
      role: "industry",
      status: "DRINKABLE",
      score: 94,
      lastReading: "Just now",
      x: 35,
      y: 70,
    },
    {
      id: "QH2O-HST-02",
      name: "Boys Hostel Monitor",
      location: "Boys Hostel Mess",
      role: "industry",
      status: "DRINKABLE",
      score: 89,
      lastReading: "10 mins ago",
      x: 65,
      y: 70,
    },
    {
      id: "QH2O-LAB-01",
      name: "Chemistry Lab Feed",
      location: "Laboratories Block",
      role: "industry",
      status: "WARNING",
      score: 68,
      lastReading: "1 hour ago",
      x: 85,
      y: 45,
    },
    {
      id: "QH2O-GRD-01",
      name: "Irrigation Node",
      location: "Gardening Area",
      role: "industry",
      status: "WARNING",
      score: 71,
      lastReading: "30 mins ago",
      x: 15,
      y: 85,
    },
    {
      id: "QH2O-TNK-01",
      name: "Primary Tank Feed",
      location: "Main Water Tank",
      role: "industry",
      status: "NOT DRINKABLE",
      score: 32,
      lastReading: "Just now",
      x: 50,
      y: 15,
    },
    {
      id: "QH2O-MEC-01",
      name: "Workshop Outlet",
      location: "Mechanical Block",
      role: "industry",
      status: "DRINKABLE",
      score: 88,
      lastReading: "15 mins ago",
      x: 85,
      y: 85,
    },

    // VILLAGE NODES
    {
      id: "VIL-MWS-01",
      name: "Main Water Source Outlet",
      location: "River Intake",
      role: "village",
      status: "DRINKABLE",
      score: 92,
      lastReading: "Just now",
      x: 80,
      y: 75,
    },
    {
      id: "VIL-VHC-02",
      name: "Village Health Centre",
      location: "Main Street",
      role: "village",
      status: "DRINKABLE",
      score: 94,
      lastReading: "10 mins ago",
      x: 30,
      y: 35,
    },
    {
      id: "VIL-PS-03",
      name: "Primary School Drinking Tap",
      location: "School Yard",
      role: "village",
      status: "DRINKABLE",
      score: 96,
      lastReading: "1 hr ago",
      x: 45,
      y: 65,
    },
    {
      id: "VIL-CT-04",
      name: "Community Water Tank",
      location: "Village Square",
      role: "village",
      status: "DRINKABLE",
      score: 91,
      lastReading: "5 mins ago",
      x: 20,
      y: 55,
    },
    {
      id: "VIL-HW-05",
      name: "Household Drinking Outlet",
      location: "Sector B",
      role: "village",
      status: "DRINKABLE",
      score: 89,
      lastReading: "Just now",
      x: 55,
      y: 80,
    },
    {
      id: "VIL-AGR-06",
      name: "Agriculture Pump Outlet",
      location: "Farms",
      role: "village",
      status: "WARNING",
      score: 72,
      lastReading: "2 hrs ago",
      x: 65,
      y: 25,
    }
  ];

  const devices = allDevices.filter(d => d.role === userRole);


  const getStatusConfig = (status: string) => {
    switch (status) {
      case "DRINKABLE":
        return { color: "emerald", bg: "bg-emerald-500", ripple: "bg-emerald-400", border: "border-emerald-500", text: "text-emerald-700", icon: ShieldCheck };
      case "WARNING":
        return { color: "amber", bg: "bg-amber-500", ripple: "bg-amber-400", border: "border-amber-500", text: "text-amber-700", icon: AlertTriangle };
      case "NOT DRINKABLE":
        return { color: "rose", bg: "bg-rose-500", ripple: "bg-rose-400", border: "border-rose-500", text: "text-rose-700", icon: AlertCircle };
      default:
        return { color: "slate", bg: "bg-slate-400", ripple: "bg-transparent", border: "border-slate-400", text: "text-slate-600", icon: Activity };
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 leading-none">Community Health View</h1>
          <p className="text-xl text-slate-500 font-medium mt-3">Live water safety monitoring across deployed sensor nodes.</p>
        </div>
        
        <div className="flex gap-4 p-2 bg-white rounded-full border border-slate-200 shadow-sm shrink-0">
          <div className="flex items-center gap-2 px-3 py-1">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Drinkable</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1">
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block shadow-[0_0_10px_rgba(245,158,11,0.5)]"></span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Warning</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block shadow-[0_0_10px_rgba(244,63,94,0.5)]"></span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Not Drinkable</span>
          </div>
        </div>
      </div>

      {/* Main Map View */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 p-6 md:p-8 relative min-h-[600px] flex items-center justify-center overflow-hidden">
        
        {/* Placeholder SVG Map Background */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Render Device Nodes */}
        <div className="relative w-full max-w-4xl aspect-[4/3] z-10">
          {devices.map((device) => {
            const config = getStatusConfig(device.status);
            const isSelected = selectedDevice?.id === device.id;
            
            return (
              <div 
                key={device.id}
                className="absolute z-20 group cursor-pointer"
                style={{ top: device.y + "%", left: device.x + "%", transform: 'translate(-50%, -50%)' }}
                onClick={() => setSelectedDevice(device === selectedDevice ? null : device)}
              >
                {/* Ripple Effect for active devices */}
                {device.status !== "OFFLINE" && (
                  <>
                    <div className={clsx("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full animate-ping opacity-75", config.ripple)}></div>
                    <div className={clsx("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full animate-ping opacity-30 animation-delay-500", config.ripple)}></div>
                  </>
                )}
                
                {/* Node Pin */}
                <div className={clsx(
                  "relative w-7 h-7 rounded-full border-4 shadow-lg flex items-center justify-center transition-transform duration-300", 
                  config.bg, config.border,
                  isSelected ? "scale-150 ring-4 ring-offset-2 ring-slate-900" : "group-hover:scale-125"
                )}>
                  {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                </div>

                {/* Always show small label on large screens */}
                <div className={clsx(
                  "hidden md:block absolute top-full left-1/2 -translate-x-1/2 mt-3 whitespace-nowrap text-sm font-bold bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-slate-100 transition-opacity",
                  isSelected ? "opacity-0" : "opacity-100 group-hover:opacity-100"
                )}>
                  {device.name}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Device Popup */}
        <AnimatePresence>
          {selectedDevice && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="absolute bottom-8 left-8 right-8 md:right-auto md:w-[420px] bg-white rounded-[2.5rem] border border-slate-200 shadow-[0_20px_60px_rgba(0,0,0,0.1)] z-30 flex flex-col overflow-hidden"
            >
              <div className={clsx("h-3 w-full", getStatusConfig(selectedDevice.status).bg)}></div>
              
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div>
                     <h3 className="text-3xl font-black text-slate-900 leading-none mb-2">{selectedDevice.name}</h3>
                     <div className="text-slate-400 font-mono text-sm">{selectedDevice.id}</div>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedDevice(null); }}
                    className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-sm"
                  >
                    <Activity className="w-5 h-5 rotate-45" /> 
                  </button>
                </div>

                {/* Main Metrics */}
                <div className="space-y-4 mb-auto">
                   <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                     <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Location</div>
                     <div className="font-bold text-slate-900">{selectedDevice.location}</div>
                   </div>

                   <div className={clsx(
                    "p-6 rounded-3xl border shadow-sm relative overflow-hidden",
                    selectedDevice.status === "DRINKABLE" ? "bg-emerald-50 border-emerald-100" :
                    selectedDevice.status === "WARNING" ? "bg-amber-50 border-amber-100" :
                    "bg-rose-50 border-rose-100"  
                  )}>
                    {selectedDevice.status === "NOT DRINKABLE" && (
                      <div className="absolute top-0 right-0 p-4">
                        <AlertTriangle className="w-16 h-16 text-rose-500/20" />
                      </div>
                    )}
                    <span className={clsx("text-xs font-black uppercase tracking-widest", getStatusConfig(selectedDevice.status).text)}>
                      Water Status
                    </span>
                    <div className={clsx("text-4xl font-black mt-1 tracking-tighter", getStatusConfig(selectedDevice.status).text)}>
                      {selectedDevice.status}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 border border-slate-100 p-5 rounded-3xl shrink-0">
                      <div className="flex items-center gap-2 mb-2">
                         <Activity className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Quality</span>
                      </div>
                      <div className={clsx("text-3xl font-black", selectedDevice.score >= 90 ? "text-emerald-600" : selectedDevice.score >= 70 ? "text-amber-500" : "text-rose-600")}>
                        {selectedDevice.score}
                        <span className="text-sm font-medium text-slate-400 ml-1">/ 100</span>
                      </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 p-5 rounded-3xl shrink-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Last Read</span>
                      </div>
                      <div className="text-lg font-bold text-slate-900 mt-2">
                        {selectedDevice.lastReading}
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  href={"/dashboard/device/" + selectedDevice.id}
                  className="mt-6 flex items-center justify-center gap-2 w-full py-4 bg-slate-900 text-white font-bold text-lg rounded-2xl shadow-[0_10px_30px_rgba(15,23,42,0.2)] hover:shadow-[0_15px_40px_rgba(15,23,42,0.3)] hover:-translate-y-1 transition-all group"
                >
                  View Full Analytics
                  <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
