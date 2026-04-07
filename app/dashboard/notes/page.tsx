"use client";

import { useState, useEffect } from "react";
import Link from "next/link"; // Link එක ඇඩ් කළා
import { 
  FileText, 
  Search, 
  Calendar, 
  MoreVertical, 
  Trash2, 
  ExternalLink,
  Loader2
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function MyNotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/notes");
      const data = await res.json();
      if (res.ok) setNotes(data);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete Function එක
  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault(); // Link එක trigger වෙන එක නවත්වන්න
    if (!confirm("Are you sure you want to delete this note?")) return;
    
    try {
      const res = await fetch(`/api/notes/${id}`, { method: "DELETE" });
      if (res.ok) {
        setNotes(notes.filter(n => n._id !== id));
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 bg-slate-950 min-h-screen text-white font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black tracking-tight mb-2">My Knowledge Base</h1>
          <p className="text-slate-500 text-sm italic">You have saved {notes.length} notes so far.</p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <Input 
            placeholder="Search notes..." 
            className="pl-10 bg-slate-900 border-slate-800 focus:border-blue-600 rounded-xl text-white transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500">
          <Loader2 className="animate-spin mb-4 text-blue-500" size={40} />
          <p className="font-bold tracking-widest uppercase text-[10px]">Syncing your data...</p>
        </div>
      ) : filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <Link key={note._id} href={`/dashboard/notes/${note._id}`}>
              <Card className="bg-slate-900/40 border-slate-800 hover:border-blue-600/40 hover:bg-slate-900/60 transition-all group overflow-hidden flex flex-col h-62.5 relative cursor-pointer">
                <CardHeader className="p-5 pb-2 flex flex-row items-start justify-between space-y-0">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-600/10 p-2 rounded-lg text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <FileText size={20} />
                    </div>
                    <CardTitle className="text-lg font-bold text-slate-200 truncate max-w-45 group-hover:text-white">
                      {note.title}
                    </CardTitle>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-slate-500 hover:text-white h-8 w-8"
                        onClick={(e) => e.stopPropagation()} // Card click එක නවත්වන්න
                      >
                        <MoreVertical size={18} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-slate-900 border-slate-800 text-white shadow-2xl">
                      <DropdownMenuItem className="focus:bg-blue-600 focus:text-white cursor-pointer">
                        <ExternalLink className="mr-2" size={14} /> Open Note
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="focus:bg-red-600 focus:text-white cursor-pointer text-red-400"
                        onClick={(e) => handleDelete(note._id, e)}
                      >
                        <Trash2 className="mr-2" size={14} /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>

                <CardContent className="p-5 pt-2 grow overflow-hidden">
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-4 italic group-hover:text-slate-400 transition-colors">
                     {note.content}
                  </p>
                </CardContent>

                <CardFooter className="p-5 pt-0 border-t border-slate-800/50 bg-slate-900/20 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar size={12} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      {new Date(note.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <div className="text-[10px] bg-blue-600/10 text-blue-400 px-2 py-1 rounded-md font-bold uppercase tracking-wider group-hover:bg-blue-600/20 transition-all">
                    Text Note
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 border-2 border-dashed border-slate-900 rounded-3xl bg-slate-900/10">
          <FileText className="mx-auto text-slate-800 mb-4" size={48} />
          <p className="text-slate-600 italic">No notes found matching your search.</p>
        </div>
      )}
    </div>
  );
}