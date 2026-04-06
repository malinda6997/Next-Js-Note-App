"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function MyNotesPage() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("/api/notes")
      .then(res => res.json())
      .then(data => setNotes(data));
  }, []);

  return (
    <div className="p-10 text-white font-sans">
      <h1 className="text-3xl font-bold mb-8">All My Notes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note: any) => (
          <Card key={note._id} className="bg-slate-900 border-slate-800 text-white hover:border-blue-600 transition-all">
            <CardHeader>
              <CardTitle className="text-lg font-bold">{note.title}</CardTitle>
              <p className="text-[10px] text-slate-500">{new Date(note.createdAt).toLocaleString()}</p>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400 text-sm line-clamp-3">{note.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}