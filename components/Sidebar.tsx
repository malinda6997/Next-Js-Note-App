"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, BookOpen, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarItem = ({ icon, label, href }: { icon: React.ReactNode, label: string, href: string }) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link href={href}>
      <div className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-blue-600/10 text-blue-400 font-bold' : 'text-slate-500 hover:bg-slate-900 hover:text-slate-300'}`}>
        {icon}
        <span className="text-sm tracking-tight">{label}</span>
      </div>
    </Link>
  );
};

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-slate-900 bg-slate-950/50 backdrop-blur-xl hidden md:flex flex-col p-6 sticky top-0 h-screen">
      <div className="mb-10 px-2">
        <h2 className="text-xl font-black tracking-tighter text-white">CloudNote.ai</h2>
      </div>
      <nav className="space-y-2 grow">
        <SidebarItem icon={<LayoutDashboard size={20} />} label="Overview" href="/dashboard" />
        <SidebarItem icon={<BookOpen size={20} />} label="My Notes" href="/dashboard/notes" />
        <SidebarItem icon={<Settings size={20} />} label="Settings" href="/dashboard/settings" />
      </nav>
      <Button 
        variant="ghost" 
        className="text-slate-500 hover:text-red-400 hover:bg-red-400/10 justify-start px-2 transition-colors"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        <LogOut className="mr-3" size={20} />
        Sign Out
      </Button>
    </aside>
  );
}