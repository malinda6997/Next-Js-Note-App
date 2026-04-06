"use client";

import { useState, useEffect } from "react";
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
          <p className="text-slate-500 text-sm">You have saved {notes.length} notes so far.</p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <Input 
            placeholder="Search notes..." 
            className="pl-10 bg-slate-900 border-slate-800 focus:border-blue-600 rounded-xl text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500">
          <Loader2 className="animate-spin mb-4" size={40} />
          <p className="font-bold tracking-widest uppercase text-xs">Syncing your data...</p>
        </div>
      ) : filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <Card key={note._id} className="bg-slate-900/50 border-slate-800 hover:border-blue-600/50 transition-all group overflow-hidden flex flex-col h-[250px]">
              <CardHeader className="p-5 pb-2 flex flex-row items-start justify-between space-y-0">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600/10 p-2 rounded-lg text-blue-400">
                    <FileText size={20} />
                  </div>
                  <CardTitle className="text-lg font-bold text-slate-200 truncate max-w-[180px]">
                    {note.title}
                  </CardTitle>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-slate-500 hover:text-white">
                      <MoreVertical size={18} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-slate-900 border-slate-800 text-white">
                    <DropdownMenuItem className="focus:bg-blue-600 focus:text-white cursor-pointer">
                      <ExternalLink className="mr-2" size={14} /> Open Note
                    </DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-red-600 focus:text-white cursor-pointer text-red-400">
                      <Trash2 className="mr-2" size={14} /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>

              <CardContent className="p-5 pt-2 flex-grow overflow-hidden">
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-4 italic">
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
                <div className="text-[10px] bg-blue-600/10 text-blue-400 px-2 py-1 rounded-md font-bold uppercase tracking-wider">
                  Text Note
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed border-slate-900 rounded-3xl">
          <p className="text-slate-500 italic">No notes found matching your search.</p>
        </div>
      )}
    </div>
  );
}