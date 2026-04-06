import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-between p-6 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center flex-grow pt-20 pb-10">
        <p className="text-blue-400 font-medium tracking-widest uppercase text-[10px] sm:text-xs mb-4 animate-in fade-in slide-in-from-bottom-3 duration-700">
          The Intelligent Way to Study
        </p>
        
        <h1 className="text-6xl md:text-8xl font-extrabold mb-8 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent tracking-tighter">
          CloudNote.ai
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-20 animate-in fade-in zoom-in duration-1000 text-center">
          <Link href="/login">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-7 rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(37,99,235,0.3)]">
              Start Studying
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="outline" className="bg-transparent border-slate-700 hover:bg-slate-800 text-white px-10 py-7 rounded-full font-bold text-lg transition-all hover:border-slate-500">
              Create Account
            </Button>
          </Link>
        </div>

        {/* Feature Cards Grid - 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl w-full mb-10">
          <FeatureCard 
            title="AI Summary" 
            desc="Condense long lectures into key focus points instantly." 
          />
          <FeatureCard 
            title="Smart Tags" 
            desc="AI automatically categorizes your notes for fast retrieval." 
          />
          <FeatureCard 
            title="Cloud Sync" 
            desc="Access your study materials from any device, anywhere." 
          />
          <FeatureCard 
            title="Focus Mode" 
            desc="Distraction-free interface designed for deep learning." 
          />
        </div>
      </div>

      {/* Professional Footer */}
      <footer className="w-full max-w-5xl py-8 border-t border-slate-900 flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-2 text-slate-500 text-sm font-medium tracking-wide">
          <span>Copyright © 2026</span>
          <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
          <span>Developed by <span className="text-blue-500/80">Malinda Prabath</span></span>
        </div>
        <p className="text-[10px] text-slate-700 uppercase tracking-[0.2em]">Next-Gen Note Taking Platform</p>
      </footer>
    </div>
  );
}

function FeatureCard({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="p-6 bg-slate-900/30 border border-slate-800/40 rounded-2xl backdrop-blur-sm hover:border-blue-500/20 transition-all group text-center">
      <h3 className="text-lg font-bold mb-2 text-blue-300 group-hover:text-blue-200 transition-colors">{title}</h3>
      <p className="text-slate-400 text-xs leading-relaxed">{desc}</p>
    </div>
  );
}