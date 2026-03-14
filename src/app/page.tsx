"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Droplet, ArrowRight, Network, BrainCircuit, CheckCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";

const AnimatedText = ({ text, className }: { text: string; className?: string }) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {text}
      </motion.div>
    </div>
  );
};

export default function LandingPage() {
  const [isPotable, setIsPotable] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Add smooth scrolling behavior to HTML purely via JS on mount for the awwwards feel
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    }
  }, []);

  // 1. Hero Parallax
  const heroRef = useRef(null);
  const { scrollYProgress: heroYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(heroYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(heroYProgress, [0, 1], [1, 0]);

  // 3. Horizontal Scroll
  const horizontalScrollRef = useRef(null);
  const { scrollYProgress: horizontalYProgress } = useScroll({
    target: horizontalScrollRef,
  });
  // Map 0 -> 1 scroll to 0 -> -X% translation
  const xTransform = useTransform(horizontalYProgress, [0, 1], ["0%", "-62%"]);

  return (
    <div className="bg-[#F1F5F9] text-slate-900 selection:bg-sky-200">

      {/* Navigation - Mix Blend Mode for dynamic contrast */}
      <nav className="fixed w-full px-6 py-6 flex items-center justify-between z-50 mix-blend-difference text-white pointer-events-none">
        <div className="flex items-center gap-2 font-black text-2xl tracking-tighter pointer-events-auto">
          <Droplet className="w-6 h-6 fill-current" />
          <span>QH2O</span>
        </div>
        <div className="flex items-center gap-4 pointer-events-auto">
          <Link href="/login" className="px-6 py-3 text-sm font-bold rounded-full border border-white/30 hover:bg-white hover:text-black transition-all">
            Sign In
          </Link>
        </div>
      </nav>

      {/* Main content wrapped to allow footer reveal */}
      <main className="relative z-10 bg-[#F1F5F9] shadow-[0_20px_50px_rgba(0,0,0,0.2)] mb-[60vh]">

        {/* 1. Hero Section (Parallax) */}
        <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-white rounded-b-[3rem]">
          {/* Massive Background Typography */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.03]">
            <h1 className="text-[30vw] font-black tracking-tighter text-sky-900 whitespace-nowrap">
              QH2O
            </h1>
          </div>

          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 flex flex-col items-center text-center px-4 w-full">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="mb-10 relative flex items-center justify-center"
            >
              <div className="absolute w-64 h-64 bg-sky-200/40 rounded-full blur-3xl animate-pulse"></div>
              <Droplet className="w-20 h-20 text-sky-600 relative z-10" strokeWidth={1.5} />
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="text-6xl md:text-[8vw] font-black tracking-tighter text-slate-900 leading-[0.9] text-center"
              >
                PORTABLE<br />
                <span className="text-sky-600">LAB-GRADE</span><br />
                INTELLIGENCE.
              </motion.h1>
            </div>
          </motion.div>
        </section>

        {/* 2. The Statement (Large Typography Scroll Reveal) */}
        <section className="py-32 md:py-48 px-6 md:px-20 bg-[#F1F5F9] relative flex items-center">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-[4vw] font-medium tracking-tight text-slate-400 leading-[1.1]">
              <span className="text-slate-900 font-bold block mb-4">Water quality isn't just a metric; it's a right.</span>
              Traditional testing is locked in labs, leaving Gram Panchayats and industrial zones in the dark.
              <span className="text-sky-600 font-bold"> QH2O breaks the glass wall</span>, putting an IoT-enabled laboratory directly into the hands of local operators.
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-16 md:mt-24"
            >
              <Link href="#specs" className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-sky-600 transition-all group shadow-2xl">
                Explore Solution
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* 3. Horizontal Scroll "Sensing Suite" */}
        <section ref={horizontalScrollRef} className="relative h-[300vh] bg-white rounded-[3rem] shadow-xl" id="specs">
          <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-20">

            <div className="px-6 md:px-20 mb-16 flex items-end justify-between w-full flex-shrink-0">
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-6xl md:text-[6vw] font-black tracking-tighter text-slate-900 leading-none"
                >
                  THE COMPREHENSIVE
                </motion.h2>
                <motion.h3
                  initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="text-4xl md:text-[4vw] font-medium text-sky-600 tracking-tight leading-none"
                >
                  SENSING SUITE
                </motion.h3>
              </div>
              <p className="hidden md:block text-slate-500 max-w-sm text-right font-medium text-lg">
                High-density multi-array sensing architecture providing comprehensive field intelligence.
              </p>
            </div>

            <div className="w-full relative flex-grow flex items-center">
              <motion.div style={{ x: xTransform }} className="absolute flex gap-8 md:gap-12 px-6 md:px-20">
                {[
                  { title: "Baseline Purity", subtitle: "pH & Turbidity", desc: "The foundational metrics of safe, potable drinking water." },
                  { title: "Mineral Composition", subtitle: "TDS & Hardness", desc: "Tracking the hidden profile and dissolved solids in real-time." },
                  { title: "Chemical Safety", subtitle: "Free Chlorine & Iron", desc: "Critical protection against unseen infrastructure decay." },
                  { title: "Advanced Alkalinity", subtitle: "Total Alkalinity", desc: "Deep understanding of the water's buffering capacity." },
                ].map((item, i) => (
                  <div key={i} className="flex-shrink-0 w-[85vw] md:w-[35vw] aspect-square bg-[#F1F5F9] rounded-[2.5rem] p-10 flex flex-col justify-between border border-transparent shadow-[0_10px_40px_rgba(0,0,0,0.03)] group hover:border-sky-200 transition-colors">
                    <h3 className="text-6xl md:text-[6vw] font-black text-slate-200/50 group-hover:text-sky-200 transition-colors mb-4 leading-none">0{i + 1}</h3>
                    <div className="flex-grow flex flex-col justify-center">
                      <h4 className="text-4xl md:text-5xl font-black text-slate-900 mb-2 tracking-tight">{item.title}</h4>
                    </div>
                    <div className="space-y-4 pt-6 justify-end">
                      <div className="flex justify-between items-center text-sm md:text-base border-b border-slate-200 pb-4">
                        <span className="text-slate-400 font-bold uppercase tracking-widest">Focus</span>
                        <span className="text-slate-900 font-semibold">{item.subtitle}</span>
                      </div>
                      <div className="flex items-center text-sm md:text-lg pt-2 text-slate-500/80 font-medium">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* 4. The Smart Layer (Sticky Split Section) */}
        <section className="relative w-full bg-[#F1F5F9] pt-32 pb-48">
          <div className="max-w-7xl mx-auto px-6 md:px-20 flex flex-col lg:flex-row gap-16 lg:gap-8">

            {/* Left Side Sticky Title */}
            <div className="w-full lg:w-[45%]">
              <div className="sticky top-40">
                <AnimatedText text="THE" className="text-7xl md:text-[7vw] font-black tracking-tighter text-slate-300 leading-[0.9]" />
                <AnimatedText text="SMART LAYER" className="text-7xl md:text-[7vw] font-black tracking-tighter text-sky-600 leading-[0.9] mb-8" />
                <p className="text-2xl text-slate-500 font-medium max-w-md mt-8">Automated compliance logic powered by hybrid edge connectivity and AI inference.</p>
              </div>
            </div>

            {/* Right Side Scrolling Content */}
            <div className="w-full lg:w-[55%] flex flex-col gap-32 pt-[20vh] lg:pt-0">

              {/* Pass/Fail Component */}
              <div className="space-y-8">
                <h3 className="text-4xl font-bold text-slate-900 tracking-tight">Compliance Logic</h3>
                <div className="p-8 md:p-12 rounded-[2.5rem] bg-white border border-slate-200 shadow-xl shadow-slate-200/50">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-slate-100 pb-8 gap-6">
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">IS 10500 Validation</span>
                    <div className="flex gap-2">
                      <button onClick={() => setIsPotable(true)} className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${isPotable ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>Sample A</button>
                      <button onClick={() => setIsPotable(false)} className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${!isPotable ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>Sample B</button>
                    </div>
                  </div>

                  <div className="h-[120px] relative w-full">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={isPotable ? 'p' : 'np'}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className={`absolute inset-0 p-6 md:p-8 rounded-[2rem] flex items-center gap-6 ${isPotable ? 'bg-emerald-50 border border-emerald-100' : 'bg-rose-50 border border-rose-100'}`}
                      >
                        <div className={`p-5 rounded-full flex-shrink-0 ${isPotable ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'}`}>
                          {isPotable ? <CheckCircle className="w-10 h-10" /> : <AlertTriangle className="w-10 h-10" />}
                        </div>
                        <div>
                          <h4 className={`text-3xl font-black tracking-tight ${isPotable ? 'text-emerald-700' : 'text-rose-700'}`}>{isPotable ? 'Potable' : 'Non-Potable'}</h4>
                          <p className={`font-semibold md:text-lg mt-1 ${isPotable ? 'text-emerald-600/80' : 'text-rose-600/80'}`}>
                            {isPotable ? "All parameters within safe limits." : "Contaminant concentration above threshold."}
                          </p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Hybrid Link */}
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} className="space-y-6">
                <div className="w-20 h-20 rounded-[1.5rem] bg-sky-100 text-sky-600 flex items-center justify-center mb-8">
                  <Network className="w-10 h-10" />
                </div>
                <h3 className="text-4xl font-bold text-slate-900 tracking-tight">The "Hybrid" Link</h3>
                <p className="text-xl text-slate-600 leading-relaxed font-medium">
                  Engineered with an In-built SIM + Bluetooth architecture. Explicitly designed with <span className="text-sky-700 font-bold border-b-2 border-sky-300 pb-0.5">Offline Caching</span> to ensure zero data loss in remote groundwater belts where network signals drop.
                </p>
              </motion.div>

              {/* AI Inference */}
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} className="space-y-6">
                <div className="w-20 h-20 rounded-[1.5rem] bg-slate-900 text-white flex items-center justify-center mb-8">
                  <BrainCircuit className="w-10 h-10" />
                </div>
                <h3 className="text-4xl font-bold text-slate-900 tracking-tight">AI Inference Engine</h3>
                <p className="text-xl text-slate-600 leading-relaxed font-medium">
                  Utilizes advanced AI/ML models for the estimation of <strong className="text-slate-900 font-bold pb-0.5 border-b-2 border-slate-900">BOD (Biochemical Oxygen Demand)</strong>. Providing continuous proxy insights by analyzing multi-parameter correlations without expensive, slow chemical reagents.
                </p>
              </motion.div>

            </div>
          </div>
        </section>

        {/* 5. Roadmap to Scale Journey */}
        <section className="py-32 px-6 md:px-20 bg-white rounded-b-[3rem] relative z-20">
          <div className="max-w-4xl mx-auto text-center mb-32">
            <h2 className="text-6xl md:text-[6vw] font-black tracking-tighter text-slate-900 mb-6 leading-none">ROADMAP TO SCALE</h2>
            <p className="text-2xl text-slate-400 font-medium">The Strategic Deployment Methodology.</p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8 md:space-y-12">
            {[
              { phase: "Phase 1", title: "Precision Pilots", desc: "Partnering with local leaders and NGOs to establish baseline data in high-risk zones.", num: "01" },
              { phase: "Phase 2", title: "Data Democracy", desc: "Empowering local operators and volunteers with digital tools to manage their own water resources.", num: "02" },
              { phase: "Phase 3", title: "National Infrastructure", desc: "Integrating hyper-local, edge-computed data into a macroscopic water safety grid.", num: "03" },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-16 p-8 md:p-12 bg-[#F1F5F9] border border-transparent rounded-[2.5rem] hover:bg-sky-50 hover:border-sky-100 transition-colors group cursor-default"
              >
                <h3 className="text-[5rem] md:text-[8rem] font-black leading-none text-white drop-shadow-md group-hover:text-sky-200 transition-colors w-24 md:w-48 flex-shrink-0 tracking-tighter">{step.num}</h3>
                <div className="flex-grow pt-4 md:pt-0">
                  <span className="text-sm font-black text-sky-600 tracking-widest uppercase mb-4 block">{step.phase}</span>
                  <h4 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">{step.title}</h4>
                  <p className="text-slate-600 md:text-xl font-medium leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </main>

      {/* 6. Massive Footer Reveal (Fixed Behind Main Content) */}
      <footer className="fixed bottom-0 left-0 w-full h-[60vh] bg-slate-900 text-white flex flex-col justify-end pt-24 pb-8 px-6 md:px-20 z-0 selection:bg-sky-500">
        <div className="max-w-7xl mx-auto w-full flex flex-col justify-end h-full">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-16">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 font-black text-5xl tracking-tighter mb-8">
                <Droplet className="w-12 h-12 text-sky-500 fill-sky-500" />
                <span>QH2O</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-300 leading-tight">
                Putting an IoT-enabled laboratory into the hands of local operators.
              </h2>
            </div>

            <div className="flex gap-16 md:gap-24 font-bold text-lg md:text-xl text-slate-400">
              <div className="flex flex-col gap-4">
                <Link href="#" className="hover:text-white transition-colors">Technology</Link>
                <Link href="#" className="hover:text-white transition-colors">Impact</Link>
                <Link href="#" className="hover:text-white transition-colors">Grant</Link>
              </div>
              <div className="flex flex-col gap-4">
                <Link href="#" className="hover:text-white transition-colors">Contact</Link>
                <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-bold text-slate-600 uppercase tracking-widest">
            <p>© 2026 QH2O Environmental Tech</p>
            <p className="text-sky-500/50">A Clinical Purity Platform</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
