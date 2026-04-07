"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Loader2,
  FileText,
  Clock
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

const NoteCard = ({ id, title, date, onNavigate }: { id: string, title: string, date: string, onNavigate: (id: string) => void }) => (
  <div 
    onClick={() => onNavigate(id)} 
    className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/80 hover:border-blue-600/50 transition-all cursor-pointer p-5 flex flex-col gap-3 h-full backdrop-blur-sm"
  >
    <div className="absolute inset-0 bg-linear-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative">
      <div className="flex items-start justify-between mb-2">
        <div className="bg-blue-600/10 p-2 rounded-lg group-hover:bg-blue-600/20 transition-colors">
          <FileText size={18} className="text-blue-400" />
        </div>
      </div>
      <h4 className="font-bold text-slate-200 group-hover:text-blue-300 transition-colors mb-3 line-clamp-2 text-sm">{title}</h4>
      <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">{date}</p>
    </div>
  </div>
);

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchingNotes, setFetchingNotes] = useState(true);
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const fetchNotes = async () => {
    try {
      setFetchingNotes(true);
      const res = await fetch("/api/notes");
      const data = await res.json();
      if (res.ok) setNotes(data);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    } finally {
      setFetchingNotes(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") fetchNotes();
  }, [status]);

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      if (res.ok) {
        setIsDialogOpen(false);
        setTitle("");
        setContent("");
        fetchNotes();
      }
    } catch (error) {
      console.error("Error creating note:", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="animate-pulse font-bold tracking-widest uppercase text-xs">Initializing...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header Section with Gradient */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 blur-3xl" />
        <div className="relative p-6 md:p-10">
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Welcome back, {session?.user?.name?.split(' ')[0] || "Scholar"}!
              </h1>
              <p className="text-slate-400 text-base mt-3">Keep your thoughts organized and accessible</p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-8 py-6 font-bold shadow-lg shadow-blue-600/30 flex gap-2 transition-all">
                  <Plus size={20} /> New Note
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-800 text-white sm:max-w-131.25 rounded-2xl">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold tracking-tight">Create New Note</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateNote} className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-500 tracking-widest">Note Title</label>
                    <Input 
                      placeholder="e.g. ADBMS Lecture 01" 
                      className="bg-slate-950 border-slate-800 focus:border-blue-600 rounded-xl"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-500 tracking-widest">Content</label>
                    <Textarea 
                      placeholder="Start typing your thoughts here..." 
                      className="bg-slate-950 border-slate-800 focus:border-blue-600 rounded-xl min-h-37.5 resize-none"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      required
                    />
                  </div>
                  <DialogFooter className="pt-4">
                    <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 rounded-xl">
                      {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : "Save Note"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </header>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
            <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-6 hover:border-blue-600/50 transition-all">
              <div className="absolute inset-0 bg-linear-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Total Notes</h3>
                  <div className="p-2 bg-blue-600/10 rounded-lg">
                    <FileText size={18} className="text-blue-400" />
                  </div>
                </div>
                <p className="text-4xl font-black text-blue-400">{notes.length}</p>
                <p className="text-xs text-slate-500 mt-2">Notes created so far</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-6 hover:border-purple-600/50 transition-all">
              <div className="absolute inset-0 bg-linear-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Last Updated</h3>
                  <div className="p-2 bg-purple-600/10 rounded-lg">
                    <Clock size={18} className="text-purple-400" />
                  </div>
                </div>
                <p className="text-4xl font-black text-purple-400">
                  {notes.length > 0 
                    ? new Date(notes[0]?.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                    : '—'}
                </p>
                <p className="text-xs text-slate-500 mt-2">Today&apos;s progress</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Notes Section */}
      <div className="relative px-6 md:p-10 pt-0">
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Recent Notes</h2>
              <p className="text-slate-500 text-sm mt-1">Quick access to your latest work</p>
            </div>
            {notes.length > 3 && (
              <Link href="/dashboard/notes">
                <Button variant="outline" className="border-slate-700 hover:bg-slate-800 text-slate-300 rounded-lg">
                  View All
                </Button>
              </Link>
            )}
          </div>

          {fetchingNotes ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Loader2 className="animate-spin mx-auto mb-3 text-blue-400" size={32} />
                <p className="text-slate-400 font-medium">Loading your notes...</p>
              </div>
            </div>
          ) : notes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {notes.slice(0, 6).map((note) => (
                <NoteCard 
                  key={note._id}
                  id={note._id}
                  title={note.title} 
                  date={new Date(note.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  onNavigate={(id) => router.push(`/dashboard/notes/${id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="min-h-96 flex items-center justify-center">
              <div className="text-center max-w-md">
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/50 border border-slate-700">
                  <FileText size={32} className="text-slate-600" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No notes yet</h3>
                <p className="text-slate-500 mb-6">Start creating notes to organize your thoughts and ideas</p>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-2 font-bold">
                      <Plus size={16} className="mr-2" /> Create First Note
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-900 border-slate-800 text-white sm:max-w-131.25 rounded-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold tracking-tight">Create New Note</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleCreateNote} className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-slate-500 tracking-widest">Note Title</label>
                        <Input 
                          placeholder="e.g. ADBMS Lecture 01" 
                          className="bg-slate-950 border-slate-800 focus:border-blue-600 rounded-xl"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-slate-500 tracking-widest">Content</label>
                        <Textarea 
                          placeholder="Start typing your thoughts here..." 
                          className="bg-slate-950 border-slate-800 focus:border-blue-600 rounded-xl min-h-37.5 resize-none"
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          required
                        />
                      </div>
                      <DialogFooter className="pt-4">
                        <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 rounded-xl">
                          {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : "Save Note"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}