"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Droplet, LayoutDashboard, Cpu, GitCompare, Bell, FileText, User, Menu, X, LogOut } from "lucide-react";
import clsx from "clsx";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Devices", href: "/dashboard/devices", icon: Cpu },
    { name: "Compare", href: "/dashboard/compare", icon: GitCompare },
    { name: "Alerts", href: "/dashboard/alerts", icon: Bell },
    { name: "Reports", href: "/dashboard/reports", icon: FileText },
    { name: "Profile", href: "/dashboard/profile", icon: User },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F5F9] selection:bg-sky-200">
      
      {/* Top Navigation Desktop */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-white border-b border-slate-200 shadow-sm z-50 flex items-center px-6 md:px-12 justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-2 text-slate-900 font-black text-2xl tracking-tighter hover:opacity-80 transition-opacity">
            <Droplet className="w-8 h-8 text-sky-500 fill-sky-500" />
            <span>QH2O</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-sm transition-all",
                    isActive
                      ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                  )}
                >
                  <item.icon className={clsx("w-4 h-4", isActive ? "text-white" : "text-slate-400")} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-3 mr-2">
            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center text-sm">KS</div>
            <span className="font-bold text-slate-900 text-sm">Hi Kirubakaran!</span>
          </div>
          <button className="relative p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="h-8 w-px bg-slate-200"></div>
          <Link
            href="/login"
            className="flex items-center gap-2 px-4 py-2 text-rose-600 font-bold hover:bg-rose-50 rounded-full transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 lg:hidden">
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl flex flex-col p-6">
            <div className="flex justify-end mb-8">
              <button
                className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-2 flex-grow">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={clsx(
                      "flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all",
                      isActive
                        ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <Link
              href="/login"
              className="flex items-center gap-3 px-4 py-3.5 text-rose-600 font-bold hover:bg-rose-50 rounded-2xl transition-colors mt-auto"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </Link>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-12">
        {children}
      </main>
    </div>
  );
}
