"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Plus, Trash2, Activity, MapPin, Search, Download, RefreshCcw } from "lucide-react";
import clsx from "clsx";

export default function MyDevicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  
  const [userRole, setUserRole] = useState<string>("industry");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRole = localStorage.getItem('userRole');
      if (storedRole === 'village' || storedRole === 'industry') {
        setUserRole(storedRole);
      }
    }
  }, []);

  const [allDevices, setDevices] = useState<any[]>([
    {
      id: "QH20-MED-02",
      name: "Medical Centre Monitor",
      location: "Medical Centre",
      status: "Live",
      role: "industry",
      lastReading: "12:04 PM",
      data: { pH: 7.2, tds: 480, turbidity: 0.9, orp: 710 },
      preferences: { tds: { max: 400 } }
    },
    {
      id: "QH20-HST-01",
      name: "Boys Hostel Monitor",
      location: "Boys Hostel Mess",
      status: "Live",
      role: "industry",
      lastReading: "10 mins ago",
      data: { pH: 7.3, tds: 315, turbidity: 0.8, orp: 690 },
      preferences: {}
    },
    {
      id: "QH20-TNK-01",
      name: "Primary Tank Feed",
      location: "Main Water Tank",
      status: "Live",
      role: "industry",
      lastReading: "Just now",
      data: { pH: 6.4, tds: 1100, turbidity: 12.0, orp: 210 },
      preferences: {}
    },
    {
      id: "QH2O-LAB-01",
      name: "Chemistry Lab Feed",
      location: "Laboratories Block",
      status: "Live",
      role: "industry",
      lastReading: "1 hour ago",
      data: { pH: 7.9, tds: 280, turbidity: 0.5, orp: 720 },
      preferences: { pH: { max: 7.8 } }
    },
    {
      id: "QH2O-GRD-01",
      name: "Irrigation Node",
      location: "Gardening Area",
      status: "Live",
      role: "industry",
      lastReading: "30 mins ago",
      data: { pH: 7.1, tds: 350, turbidity: 12.0, orp: 600 },
      preferences: { turbidity: { max: 10 } }
    },
    {
      id: "VIL-MWS-01",
      name: "Main Village Source",
      location: "River Intake",
      status: "Live",
      role: "village",
      lastReading: "Just now",
      data: { pH: 7.1, tds: 250, turbidity: 1.1, orp: 680 },
      preferences: {}
    },
    {
      id: "VIL-CT-04",
      name: "Community Tank",
      location: "Village Square",
      status: "Live",
      role: "village",
      lastReading: "5 mins ago",
      data: { pH: 7.0, tds: 280, turbidity: 0.9, orp: 710 },
      preferences: {}
    }
  ]);

  const devices = allDevices.filter(d => d.role === userRole);

  const [newDevice, setNewDevice] = useState({ 
    name: "", id: "", location: "", 
    preferences: {
      pH: { min: "", max: "" },
      tds: { min: "", max: "" },
      turbidity: { min: "", max: "" },
      orp: { min: "", max: "" }
    } 
  });

  const handleSync = () => {
    // Validate min < max
    const { pH, tds, turbidity, orp } = newDevice.preferences;
    if (pH.min && pH.max && Number(pH.min) >= Number(pH.max)) return alert("pH min must be less than max");
    if (tds.min && tds.max && Number(tds.min) >= Number(tds.max)) return alert("TDS min must be less than max");
    if (turbidity.min && turbidity.max && Number(turbidity.min) >= Number(turbidity.max)) return alert("Turbidity min must be less than max");
    if (orp.min && orp.max && Number(orp.min) >= Number(orp.max)) return alert("ORP min must be less than max");

    setIsSyncing(true);
    setTimeout(() => {
      setDevices([{
        id: newDevice.id || "Q20-NEW",
        name: newDevice.name || "New Device",
        location: newDevice.location || "Unknown",
        status: "Live",
        role: userRole,
        lastReading: "Just now",
        data: { pH: 7.0, tds: 200, turbidity: 0.8, orp: 700 },
        preferences: newDevice.preferences
      }, ...allDevices]);
      setIsSyncing(false);
      setIsModalOpen(false);
      setNewDevice({ name: "", id: "", location: "", preferences: { pH: { min: "", max: "" }, tds: { min: "", max: "" }, turbidity: { min: "", max: "" }, orp: { min: "", max: "" } } });
      setShowConfig(false);
    }, 2000);
  };
  
  const getDeviceEvaluations = (data: any, prefs: any) => {
    const isWHOSafe = data.pH >= 6.5 && data.pH <= 8.5 && data.tds <= 500 && data.turbidity <= 5 && data.orp >= 300 && data.orp <= 800;
    
    let isUserSafe = true;
    if (prefs?.pH?.min !== undefined && data.pH < prefs.pH.min) isUserSafe = false;
    if (prefs?.pH?.max !== undefined && data.pH > prefs.pH.max) isUserSafe = false;
    if (prefs?.tds?.max !== undefined && data.tds > prefs.tds.max) isUserSafe = false;
    if (prefs?.turbidity?.max !== undefined && data.turbidity > prefs.turbidity.max) isUserSafe = false;
    if (prefs?.orp?.min !== undefined && data.orp < prefs.orp.min) isUserSafe = false;
    if (prefs?.orp?.max !== undefined && data.orp > prefs.orp.max) isUserSafe = false;

    // Calculate a mock score out of 100 based on data relative to WHO bounds
    let score = 100;
    if (data.pH < 6.5 || data.pH > 8.5) score -= 20;
    if (data.tds > 500) score -= 30;
    if (data.turbidity > 5) score -= 25;
    if (data.orp < 300 || data.orp > 800) score -= 15;
    if (score < 0) score = 15;

    return { 
      who: isWHOSafe ? "SAFE" : "UNSAFE", 
      user: isUserSafe ? "WITHIN LIMITS" : "EXCEEDS LIMIT",
      score
    };
  };

  const handleDownloadReport = (name: string, deviceData: any) => {
    // Generate CSV Content
    const basePh = deviceData.pH || 7.0;
    const baseTds = deviceData.tds || 300;
    const baseTurb = deviceData.turbidity || 0.8;
    const baseOrp = deviceData.orp || 700;

    const csvRows = ["Time,pH,TDS,Turbidity,ORP"];
    for(let i=0; i<24; i++) {
      const time = `${i.toString().padStart(2, '0')}:00`;
      const ph = (basePh + (Math.random() * 0.4 - 0.2)).toFixed(1);
      const tds = Math.round(baseTds + (Math.random() * 30 - 15));
      const turb = (baseTurb + (Math.random() * 0.4 - 0.2)).toFixed(1);
      const orp = Math.round(baseOrp + (Math.random() * 40 - 20));
      csvRows.push(`${time},${ph},${tds},${turb},${orp}`);
    }

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name.replace(/\s+/g, '_')}_Telemetry_24h.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.3 }}
      className="space-y-8 relative"
    >
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 leading-none">My Devices</h1>
          <p className="text-xl text-slate-500 font-medium mt-3">Manage and monitor all your connected sensors.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-900 text-white font-bold flex items-center gap-2 px-6 py-3 rounded-2xl shadow-[0_10px_30px_rgba(15,23,42,0.2)] hover:shadow-[0_15px_40px_rgba(15,23,42,0.3)] hover:-translate-y-0.5 transition-all w-full sm:w-auto justify-center"
        >
          <Plus className="w-5 h-5" />
          Add New Device
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-6 top-4 w-5 h-5 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search devices by name or ID..." 
          className="w-full bg-white border border-slate-200 rounded-2xl pl-14 pr-6 py-4 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 shadow-sm text-slate-900 font-medium placeholder:text-slate-400"
        />
      </div>

      {/* Device Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {devices.map((device, idx) => {
            const evals = getDeviceEvaluations(device.data, (device as any).preferences);
            return (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={device.id} 
                className="bg-white rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl transition-shadow p-6 flex flex-col relative group"
              >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className={clsx(
                    "p-4 rounded-xl flex items-center justify-center border",
                    device.status === "Live" ? "bg-emerald-50 text-emerald-500 border-emerald-100" : "bg-slate-50 text-slate-400 border-slate-100"
                  )}>
                    <Activity className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-black text-xl text-slate-900 line-clamp-1">{device.name}</h3>
                    <div className="flex items-center text-sm text-slate-500 font-mono mt-0.5">
                      {device.id}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-8">
                <div className="flex items-center gap-2 text-sm text-slate-600 font-medium pb-4 border-b border-slate-100">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  {device.location}
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                   <div>
                     <span className="text-xs text-slate-400 uppercase tracking-widest font-bold block mb-1">Evaluations</span>
                     <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between text-[10px] font-bold">
                          <span className="text-slate-500">WHO Standard</span>
                          <span className={clsx("px-1.5 py-0.5 rounded uppercase", evals.who === "SAFE" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700")}>{evals.who}</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] font-bold">
                          <span className="text-slate-500">User Pref</span>
                          <span className={clsx("px-1.5 py-0.5 rounded uppercase", evals.user === "WITHIN LIMITS" ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700")}>{evals.user !== "WITHIN LIMITS" ? "ABOVE LIMIT" : "SAFE"}</span>
                        </div>
                     </div>
                   </div>
                   <div className="flex flex-col items-end">
                     <span className="text-xs text-slate-400 uppercase tracking-widest font-bold block mb-1">Quality Score</span>
                     <div className="flex items-end gap-1 mt-1">
                       <span className={clsx("text-2xl font-black leading-none", evals.who === "SAFE" ? "text-emerald-500" : "text-rose-500")}>
                         {evals.score}
                       </span>
                       <span className="text-xs font-bold text-slate-400 mb-0.5">/ 100</span>
                     </div>
                     <span className="text-[10px] font-bold text-slate-400 mt-2 text-right">{device.lastReading}</span>
                   </div>
                </div>
              </div>

              <div className="mt-auto grid grid-cols-1 gap-2">
                <Link 
                  href={"/dashboard/device/" + device.id}
                  className="w-full text-center py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 shadow-md transition-all"
                >
                  View Details
                </Link>
                <div className="grid grid-cols-2 gap-2">
                   <button 
                     onClick={() => handleDownloadReport(device.name, device.data)}
                     className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors"
                   >
                     <Download className="w-4 h-4" /> Download Report
                   </button>
                   <button 
                     onClick={() => setDevices(allDevices.filter(d => d.id !== device.id))}
                     className="w-full flex items-center justify-center gap-2 py-3 bg-rose-50 text-rose-600 font-bold rounded-xl hover:bg-rose-100 transition-colors"
                   >
                     <Trash2 className="w-4 h-4" /> Delete Device
                   </button>
                </div>
              </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Add New Device Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => !isSyncing && setIsModalOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg relative z-10 overflow-hidden"
            >
              <div className="p-8">
                <h2 className="text-3xl font-black text-slate-900 mb-2">Add New Device</h2>
                <p className="text-slate-500 font-medium mb-8">Deploy a new sensor node to your network.</p>

                <div className="space-y-4">
                   <div>
                     <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Device Name</label>
                     <input 
                       className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20" 
                       placeholder="e.g. Hostel Mess Monitor"
                       value={newDevice.name} onChange={e => setNewDevice({...newDevice, name: e.target.value})}
                     />
                   </div>
                   
                   <div>
                     <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Device ID</label>
                     <input 
                       className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20" 
                       placeholder="e.g. QH2O-HST-02"
                       value={newDevice.id} onChange={e => setNewDevice({...newDevice, id: e.target.value})}
                     />
                   </div>

                   <div>
                     <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Location</label>
                     <input 
                       className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20" 
                       placeholder="e.g. Boys Hostel Mess"
                       value={newDevice.location} onChange={e => setNewDevice({...newDevice, location: e.target.value})}
                     />
                   </div>

                   <div>
                     <button 
                       onClick={() => setShowConfig(!showConfig)}
                       className="w-full h-12 flex justify-between items-center px-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
                     >
                       <span>Preferred Quality Threshold (Optional)</span>
                     </button>
                     
                     <AnimatePresence>
                       {showConfig && (
                         <motion.div 
                           initial={{ opacity: 0, height: 0 }}
                           animate={{ opacity: 1, height: "auto" }}
                           exit={{ opacity: 0, height: 0 }}
                           className="overflow-hidden mt-2"
                         >
                           <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                             <p className="text-xs text-slate-500 font-bold mb-4">Configure custom limits (leave blank to use WHO standard)</p>
                             
                             <div className="grid grid-cols-3 gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                               <span>Parameter</span>
                               <span>Min</span>
                               <span>Max</span>
                             </div>

                             <div className="space-y-3">
                               <div className="grid grid-cols-3 gap-2 items-center">
                                 <span className="font-bold text-sm text-slate-700">pH</span>
                                 <select value={newDevice.preferences.pH.min} onChange={e => setNewDevice({...newDevice, preferences: {...newDevice.preferences, pH: {...newDevice.preferences.pH, min: e.target.value}}})} className="w-full bg-white border border-slate-200 rounded-lg p-2 font-bold text-slate-900">
                                   <option value="">-</option>
                                   {[...Array(15)].map((_, i) => <option key={i} value={i}>{i}</option>)}
                                 </select>
                                 <select value={newDevice.preferences.pH.max} onChange={e => setNewDevice({...newDevice, preferences: {...newDevice.preferences, pH: {...newDevice.preferences.pH, max: e.target.value}}})} className="w-full bg-white border border-slate-200 rounded-lg p-2 font-bold text-slate-900">
                                   <option value="">-</option>
                                   {[...Array(15)].map((_, i) => <option key={i} value={i}>{i}</option>)}
                                 </select>
                               </div>

                               <div className="grid grid-cols-3 gap-2 items-center">
                                 <span className="font-bold text-sm text-slate-700">TDS (ppm)</span>
                                 <select value={newDevice.preferences.tds.min} onChange={e => setNewDevice({...newDevice, preferences: {...newDevice.preferences, tds: {...newDevice.preferences.tds, min: e.target.value}}})} className="w-full bg-white border border-slate-200 rounded-lg p-2 font-bold text-slate-900">
                                   <option value="">-</option>
                                   {[0, 100, 200, 300, 400, 500].map(v => <option key={v} value={v}>{v}</option>)}
                                 </select>
                                 <select value={newDevice.preferences.tds.max} onChange={e => setNewDevice({...newDevice, preferences: {...newDevice.preferences, tds: {...newDevice.preferences.tds, max: e.target.value}}})} className="w-full bg-white border border-slate-200 rounded-lg p-2 font-bold text-slate-900">
                                   <option value="">-</option>
                                   {[100, 200, 300, 400, 500, 1000, 2000].map(v => <option key={v} value={v}>{v}</option>)}
                                 </select>
                               </div>

                               <div className="grid grid-cols-3 gap-2 items-center">
                                 <span className="font-bold text-sm text-slate-700">Turbidity</span>
                                 <select value={newDevice.preferences.turbidity.min} onChange={e => setNewDevice({...newDevice, preferences: {...newDevice.preferences, turbidity: {...newDevice.preferences.turbidity, min: e.target.value}}})} className="w-full bg-white border border-slate-200 rounded-lg p-2 font-bold text-slate-900">
                                   <option value="">-</option>
                                   {[0, 1, 2, 3, 4, 5].map(v => <option key={v} value={v}>{v}</option>)}
                                 </select>
                                 <select value={newDevice.preferences.turbidity.max} onChange={e => setNewDevice({...newDevice, preferences: {...newDevice.preferences, turbidity: {...newDevice.preferences.turbidity, max: e.target.value}}})} className="w-full bg-white border border-slate-200 rounded-lg p-2 font-bold text-slate-900">
                                   <option value="">-</option>
                                   {[1, 2, 3, 4, 5, 10, 25, 50].map(v => <option key={v} value={v}>{v}</option>)}
                                 </select>
                               </div>

                               <div className="grid grid-cols-3 gap-2 items-center">
                                 <span className="font-bold text-sm text-slate-700">ORP (mV)</span>
                                 <select value={newDevice.preferences.orp.min} onChange={e => setNewDevice({...newDevice, preferences: {...newDevice.preferences, orp: {...newDevice.preferences.orp, min: e.target.value}}})} className="w-full bg-white border border-slate-200 rounded-lg p-2 font-bold text-slate-900">
                                   <option value="">-</option>
                                   {[-1000, -500, 0, 300, 500].map(v => <option key={v} value={v}>{v}</option>)}
                                 </select>
                                 <select value={newDevice.preferences.orp.max} onChange={e => setNewDevice({...newDevice, preferences: {...newDevice.preferences, orp: {...newDevice.preferences.orp, max: e.target.value}}})} className="w-full bg-white border border-slate-200 rounded-lg p-2 font-bold text-slate-900">
                                   <option value="">-</option>
                                   {[300, 500, 600, 800, 1000].map(v => <option key={v} value={v}>{v}</option>)}
                                 </select>
                               </div>
                             </div>
                           </div>
                         </motion.div>
                       )}
                     </AnimatePresence>
                   </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-4">
                 <button 
                   onClick={() => setIsModalOpen(false)} 
                   disabled={isSyncing}
                   className="flex-1 py-3 bg-white text-slate-600 font-bold rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors disabled:opacity-50"
                 >
                   Cancel
                 </button>
                 <button 
                   onClick={handleSync}
                   disabled={isSyncing}
                   className="flex-[2] py-3 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-80"
                 >
                   {isSyncing ? (
                     <>
                       <RefreshCcw className="w-5 h-5 animate-spin" />
                       Syncing...
                     </>
                   ) : (
                     "Sync Device"
                   )}
                 </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
