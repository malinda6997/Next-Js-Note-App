"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Loader2,
  FileText
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

const StatCard = ({ title, value }: { title: string, value: string }) => (
  <Card className="bg-slate-900 border-slate-800 text-white p-6 rounded-2xl">
    <CardHeader className="p-0 pb-2">
      <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-500">{title}</CardTitle>
    </CardHeader>
    <CardContent className="p-0">
      <p className="text-3xl font-black">{value}</p>
    </CardContent>
  </Card>
);

const NoteCard = ({ title, date }: { title: string, date: string }) => (
  <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-2xl hover:border-blue-600/30 transition-all group cursor-pointer flex flex-col gap-2">
    <div className="bg-blue-600/10 w-8 h-8 rounded-lg flex items-center justify-center text-blue-400">
        <FileText size={16} />
    </div>
    <h4 className="font-bold text-slate-200 group-hover:text-blue-400 transition-colors mb-1 truncate">{title}</h4>
    <p className="text-[10px] text-slate-600 uppercase font-bold tracking-wider">{date}</p>
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
    <div className="p-6 md:p-10">
      {/* Header Section */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Welcome, {session?.user?.name?.split(' ')[0] || "Scholar"}!
          </h1>
          <p className="text-slate-500 text-sm mt-1">Ready to organize your learning today?</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-6 font-bold shadow-lg shadow-blue-600/20 flex gap-2">
              <Plus size={20} /> New Note
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-slate-800 text-white sm:max-w-[525px] rounded-2xl">
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
                  className="bg-slate-950 border-slate-800 focus:border-blue-600 rounded-xl min-h-[150px] resize-none"
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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Notes" value={notes.length.toString()} />
        <StatCard title="AI Summaries" value="0" />
        <StatCard title="Storage Used" value="1%" />
      </div>

      {/* Recent Notes */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-300 tracking-tight">Recent Notes</h3>
          <Link href="/dashboard/notes">
              <Button variant="link" className="text-blue-400 text-xs p-0">View All</Button>
          </Link>
        </div>

        {fetchingNotes ? (
          <div className="flex items-center gap-2 text-slate-500 text-sm">
              <Loader2 className="animate-spin" size={16} /> Loading notes...
          </div>
        ) : notes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.slice(0, 3).map((note) => (
              <NoteCard 
                key={note._id} 
                title={note.title} 
                date={new Date(note.createdAt).toLocaleDateString()} 
              />
            ))}
          </div>
        ) : (
          <div className="py-10 border border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center text-slate-600 text-center">
              <p className="text-sm italic">No notes found. Create your first one!</p>
          </div>
        )}
      </section>
    </div>
  );
}