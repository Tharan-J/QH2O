"use client";

import { useState } from "react";
import { AlertTriangle, AlertCircle, WifiOff, BatteryWarning, CheckCircle, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

export default function AlertsPage() {
  const router = useRouter();
  
  const [alerts, setAlerts] = useState([
    {
      id: "ALT-092",
      type: "unsafe",
      title: "Turbidity above threshold",
      location: "Village Tank",
      deviceId: "QH2O-114",
      time: "10:42 AM",
      date: "Today",
      status: "active",
      content: "Sensor recorded 12.4 NTU against a WHO threshold of 5 NTU. Immediate action recommended.",
      metric: "Turbidity"
    },
    {
      id: "ALT-091",
      type: "sensor",
      title: "pH Sensor Malfunction",
      location: "Treatment Unit Alpha",
      deviceId: "IND-FU-02",
      time: "08:15 AM",
      date: "Today",
      status: "active",
      content: "Erratic readings detecting standard deviation limit breach. Recalibration required immediately.",
      metric: "pH"
    },
    {
      id: "ALT-090",
      type: "offline",
      title: "Device Offline",
      location: "Community Hospital",
      deviceId: "QH2O-120",
      time: "02:30 AM",
      date: "Today",
      status: "resolved",
      content: "Lost connection to the cellular network and fallback bluetooth disconnected.",
      metric: "System"
    },
    {
      id: "ALT-089",
      type: "battery",
      title: "Battery Low",
      location: "North Gate Borewell",
      deviceId: "QH2O-112",
      time: "06:00 PM",
      date: "Yesterday",
      status: "resolved",
      content: "Internal battery dropped below 15%. Scheduled solar recharge successfully completed.",
      metric: "Power"
    }
  ]);

  const handleAcknowledgeAll = () => {
    setAlerts(alerts.map(a => ({ ...a, status: "resolved" })));
  };

  const handleDismiss = (id: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, status: "resolved" } : a));
  };

  const handleReview = (deviceId: string, metric?: string) => {
    // Navigate to device page with a query parameter pointing to the metric (mocked behavior handled intuitively by the device page or simply redirecting)
    if (deviceId) {
      router.push(`/dashboard/device/${deviceId}#${metric || ''}`);
    }
  };

  const getAlertConfig = (type: string, status: string) => {
    if (status === "resolved") {
      return { icon: CheckCircle, bg: "bg-slate-100", border: "border-slate-200", iconColor: "text-slate-400", titleColor: "text-slate-500", dot: "bg-slate-300" };
    }
    switch (type) {
      case "unsafe":
        return { icon: AlertCircle, bg: "bg-rose-50", border: "border-rose-200", iconColor: "text-rose-600", titleColor: "text-rose-800", dot: "bg-rose-500" };
      case "sensor":
        return { icon: AlertTriangle, bg: "bg-amber-50", border: "border-amber-200", iconColor: "text-amber-600", titleColor: "text-amber-800", dot: "bg-amber-500" };
      case "offline":
        return { icon: WifiOff, bg: "bg-slate-50", border: "border-slate-300", iconColor: "text-slate-700", titleColor: "text-slate-900", dot: "bg-slate-700" };
      case "battery":
        return { icon: BatteryWarning, bg: "bg-orange-50", border: "border-orange-200", iconColor: "text-orange-500", titleColor: "text-orange-800", dot: "bg-orange-500" };
      default:
        return { icon: AlertCircle, bg: "bg-slate-50", border: "border-slate-200", iconColor: "text-slate-500", titleColor: "text-slate-900", dot: "bg-slate-500" };
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 flex items-center gap-3">
            <AlertTriangle className="w-10 h-10 text-rose-500" /> Global Alert Center
          </h1>
          <p className="text-xl text-slate-500 font-medium mt-3">Priority notifications requiring intervention.</p>
        </div>
        
        <div className="flex gap-2">
           <button 
             onClick={handleAcknowledgeAll}
             className="px-6 py-3 rounded-full bg-slate-900 text-white font-bold shadow-[0_10px_20px_rgba(15,23,42,0.15)] hover:shadow-[0_10px_25px_rgba(15,23,42,0.25)] hover:-translate-y-0.5 transition-all"
           >
             Acknowledge All
           </button>
        </div>
      </div>

      {/* Alert Feed List */}
      <div className="space-y-4">
        {alerts.map((alert) => {
          const config = getAlertConfig(alert.type, alert.status);
          const Icon = config.icon;
          
          return (
            <div 
              key={alert.id}
              className={clsx(
                "w-full rounded-[2.5rem] border p-6 md:p-8 flex flex-col md:flex-row gap-6 transition-all group",
                config.bg, config.border, alert.status === 'active' ? "shadow-lg hover:shadow-xl" : "shadow-sm hover:shadow"
              )}
            >
              <div className={clsx("w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border", alert.status === 'active' ? "bg-white shadow-sm border-slate-100" : "bg-transparent border-transparent")}>
                <Icon className={clsx("w-8 h-8", config.iconColor)} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className={clsx("w-2.5 h-2.5 rounded-full inline-block shrink-0", config.dot, alert.status === 'active' && "animate-pulse")}></span>
                  <h3 className={clsx("text-2xl font-black tracking-tight truncate", config.titleColor)}>{alert.title}</h3>
                </div>
                
                <p className="text-slate-600 font-medium text-lg leading-relaxed mb-6 max-w-2xl">
                  {alert.content}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 w-full justify-between mt-auto">
                   
                   {/* Meta info layout */}
                   <div className="flex flex-wrap items-center gap-4">
                     <div className="bg-white px-4 py-2 rounded-xl text-sm font-bold text-slate-500 shadow-sm border border-slate-100 flex items-center gap-2">
                        <span className="uppercase tracking-widest text-[10px]">Location:</span>
                        <span className="text-slate-900">{alert.location}</span>
                     </div>
                     <div className="bg-white px-4 py-2 rounded-xl text-sm font-bold text-slate-500 shadow-sm border border-slate-100 flex items-center gap-2">
                        <span className="uppercase tracking-widest text-[10px]">Device ID:</span>
                        <span className="text-slate-900 font-mono">{alert.deviceId}</span>
                     </div>
                   </div>

                   {/* Right aligned Time & Action Buttons layout fixes */}
                   <div className="flex flex-col sm:items-end gap-4 shrink-0 mt-4 sm:mt-0">
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest">
                        <Clock className="w-4 h-4" />
                        {alert.date} • {alert.time}
                      </div>

                      {alert.status === 'active' && (
                        <div className="flex items-center gap-3 w-full sm:w-auto mt-2">
                           <button 
                             onClick={() => handleReview(alert.deviceId, alert.metric)}
                             className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:bg-slate-800 transition-colors flex-1 sm:flex-none"
                           >
                             Review
                           </button>
                           <button 
                             onClick={() => handleDismiss(alert.id)}
                             className="px-6 py-2.5 bg-white text-slate-500 font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors flex-1 sm:flex-none"
                           >
                             Dismiss
                           </button>
                        </div>
                      )}
                   </div>
                </div>
                
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
