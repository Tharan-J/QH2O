"use client";

import Link from "next/link";
import { Droplet, ArrowLeft, Mail, Lock, User, Building } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex bg-slate-50 selection:bg-sky-200">
      {/* Left side: Brand Imagery */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative items-center justify-center p-12 overflow-hidden">
        {/* Background blobs for visual interest */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-sky-500/20 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] mix-blend-screen" />

        <div className="max-w-xl z-10 text-white space-y-8">
          <Link href="/" className="inline-flex items-center gap-2 text-white font-black text-3xl tracking-tighter mb-8 hover:text-white/80 transition-colors">
            <Droplet className="w-10 h-10 text-sky-500 fill-sky-500" />
            <span>QH2O</span>
          </Link>

          <h1 className="text-6xl font-black leading-[1.1] tracking-tighter">
            Portable Lab-Grade<br />
            <span className="text-sky-400">Water Intelligence.</span>
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed font-medium mt-6">
            Monitor water quality in real-time across industries and communities. Join the smart water network.
          </p>

          <div className="pt-8 grid grid-cols-2 gap-6 opacity-80">
            <div className="border-l-2 border-slate-700 pl-4">
              <div className="text-3xl font-black text-white">10k+</div>
              <div className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-1">Sensors Validated</div>
            </div>
            <div className="border-l-2 border-slate-700 pl-4">
              <div className="text-3xl font-black text-white">99.9%</div>
              <div className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-1">AI Accuracy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative">
        <Link href="/" className="absolute top-8 left-8 p-3 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all lg:hidden">
          <ArrowLeft className="w-6 h-6" />
        </Link>

        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-black tracking-tighter text-slate-900 mb-2">Create Account</h2>
            <p className="text-slate-500 font-medium text-lg">Join QH2O and digitize your water intelligence.</p>
          </div>

          <form className="space-y-6" action="/dashboard" method="GET">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-900" htmlFor="name">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-medium focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all shadow-sm text-slate-900 placeholder:text-slate-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-900" htmlFor="email">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  placeholder="name@organization.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-medium focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all shadow-sm text-slate-900 placeholder:text-slate-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-900" htmlFor="organization">Organization</label>
              <div className="relative">
                <Building className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  id="organization"
                  type="text"
                  placeholder="Company or Community Name"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-medium focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all shadow-sm text-slate-900 placeholder:text-slate-400"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-900" htmlFor="password">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-medium focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all shadow-sm text-slate-900 placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-900" htmlFor="confirm-password">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                  <input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-medium focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all shadow-sm text-slate-900 placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg shadow-[0_10px_40px_rgba(15,23,42,0.2)] hover:shadow-[0_10px_40px_rgba(15,23,42,0.3)] hover:-translate-y-1 transition-all mt-4">
              Create Account
            </button>
          </form>

          <p className="text-center text-slate-600 font-medium pt-2">
            Already have an account? <Link href="/login" className="font-bold text-sky-600 hover:text-sky-700 transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
