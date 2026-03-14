"use client";

import { User, Mail, Building, Bell, Shield, Key } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-6 mb-8">
        <div className="w-24 h-24 bg-slate-900 text-white rounded-full flex items-center justify-center text-4xl font-black shadow-lg">
          KS
        </div>
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900">Kirubakaran S.</h1>
          <p className="text-xl text-slate-500 font-medium mt-1">Administrator • QH2O Platform</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6">Personal Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Full Name</label>
              <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">
                <User className="w-5 h-5 text-slate-400" />
                <span className="font-bold text-slate-900">Kirubakaran S.</span>
              </div>
            </div>
            
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Email Address</label>
              <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">
                <Mail className="w-5 h-5 text-slate-400" />
                <span className="font-bold text-slate-900">kirubakaran.s@qh2o.example.com</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Organization</label>
              <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">
                <Building className="w-5 h-5 text-slate-400" />
                <span className="font-bold text-slate-900">Bannari Amman Institute</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6">Security & Preferences</h2>
          
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-100 transition-colors group">
              <div className="flex items-center gap-3">
                <Key className="w-5 h-5 text-slate-400 group-hover:text-slate-900" />
                <span className="font-bold text-slate-700 group-hover:text-slate-900">Change Password</span>
              </div>
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-100 transition-colors group">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-slate-400 group-hover:text-slate-900" />
                <span className="font-bold text-slate-700 group-hover:text-slate-900">Two-Factor Authentication</span>
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-emerald-500 bg-emerald-50 px-2 py-1 rounded-md">Enabled</span>
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-100 transition-colors group">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-slate-400 group-hover:text-slate-900" />
                <span className="font-bold text-slate-700 group-hover:text-slate-900">Notification Settings</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
