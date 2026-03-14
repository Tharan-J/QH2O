"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Droplet, ArrowLeft, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "industry@qh2o.com") {
      localStorage.setItem('userRole', 'industry');
      router.push("/dashboard");
    } else if (email === "village@qh2o.com") {
      localStorage.setItem('userRole', 'village');
      router.push("/dashboard");
    } else {
      localStorage.setItem('userRole', 'industry');
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex bg-background selection:bg-primary/20">

      {/* Left side: Brand Imagery */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative items-center justify-center p-12 overflow-hidden">
        {/* Background blobs for visual interest */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-sky-500/20 rounded-full blur-[100px] mix-blend-screen" />

        <div className="max-w-xl z-10 text-white space-y-8">
          <Link href="/" className="inline-flex items-center gap-2 text-white font-black text-3xl tracking-tighter mb-8 hover:text-white/80 transition-colors">
            <Droplet className="w-10 h-10 text-sky-500 fill-sky-500" />
            <span>QH2O</span>
          </Link>

          <h1 className="text-5xl font-black leading-[1.1] tracking-tighter">
            Your water's health,<br />in your pocket.
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed font-medium">
            Join thousands of users who trust QH2O for real-time monitoring and AI-powered purity analysis.
          </p>

          <div className="pt-8 flex flex-col space-y-4">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Demo Accounts Available:</span>
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 backdrop-blur-sm flex flex-col gap-2 shadow-lg">
              <div className="flex justify-between items-center">
                <span className="text-slate-300 font-medium">Bannari Amman Institute</span>
                <span className="text-sky-400 font-mono text-sm">industry@qh2o.com</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300 font-medium">Thannuthu Village</span>
                <span className="text-sky-400 font-mono text-sm">village@qh2o.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative">
        <Link href="/" className="absolute top-8 left-8 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all lg:hidden">
          <ArrowLeft className="w-6 h-6" />
        </Link>

        <div className="w-full max-w-sm space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-black tracking-tighter text-slate-900 mb-2">Welcome back</h2>
            <p className="text-slate-500 font-medium text-lg">Please enter your details to sign in.</p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-900" htmlFor="email">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-medium focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all shadow-sm text-slate-900 placeholder:text-slate-400"
                  required
                />
              </div>
            </div>

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

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-slate-900 focus:ring-slate-900 accent-slate-900" />
                <span className="text-sm text-slate-600 font-medium group-hover:text-slate-900 transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-sm font-bold text-sky-600 hover:text-sky-700 transition-colors">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg shadow-[0_10px_40px_rgba(15,23,42,0.2)] hover:shadow-[0_10px_40px_rgba(15,23,42,0.3)] hover:-translate-y-1 transition-all">
              Sign In
            </button>
          </form>

          <p className="text-center text-slate-600 font-medium pt-4">
            Don't have an account? <Link href="/signup" className="font-bold text-sky-600 hover:text-sky-700 transition-colors">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
