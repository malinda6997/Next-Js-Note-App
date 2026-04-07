"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { 
  ArrowLeft, 
  Save, 
  Trash2, 
  Sparkles, 
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardHeader, 
  CardContent
} from "@/components/ui/card";

export default function SingleNotePage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [note, setNote] = useState({ title: "", content: "" });
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [summarizing, setSummarizing] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await fetch(`/api/notes/${id}`);
        const data = await res.json();
        if (res.ok) setNote(data);
      } catch {
        console.error("Fetch error");
      } finally {
        setLoading(false);
      }
    };
    
    fetchNote();
  }, [id]);

  const handleUpdate = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      });
      if (res.ok) alert("Note updated successfully!");
    } catch {
      console.error("Update error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this note?")) return;
    try {
      const res = await fetch(`/api/notes/${id}`, { method: "DELETE" });
      if (res.ok) router.push("/dashboard/notes");
    } catch {
      console.error("Delete error");
    }
  };

  const generateSummary = async () => {
    setSummarizing(true);
    try {
      // මෙතනට ඔයාගේ AI API එක (Gemini/OpenAI) සම්බන්ධ කරන්න පුළුවන්
      const res = await fetch(`/api/ai/summarize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: note.content }),
      });
      const data = await res.json();
      setSummary(data.summary);
    } catch {
      setSummary("AI Summary generation failed. Please try again.");
    } finally {
      setSummarizing(false);
    }
  };

  if (loading) return <div className="flex h-screen items-center justify-center bg-slate-950 text-white italic">Loading note content...</div>;

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-900 pb-6">
        <Button variant="ghost" onClick={() => router.back()} className="text-slate-400 hover:text-white p-0">
          <ArrowLeft className="mr-2" size={18} /> Back to Library
        </Button>
        <div className="flex flex-wrap gap-3">
          <Button onClick={generateSummary} disabled={summarizing} className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-5 font-bold flex gap-2">
            {summarizing ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />} AI Summarize
          </Button>
          <Button onClick={handleUpdate} disabled={saving} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 font-bold flex gap-2">
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Save Changes
          </Button>
          <Button onClick={handleDelete} variant="destructive" className="rounded-xl px-5 font-bold flex gap-2">
            <Trash2 size={18} /> Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Editor Section */}
        <div className="lg:col-span-2 space-y-6">
          <Input 
            value={note.title} 
            onChange={(e) => setNote({...note, title: e.target.value})}
            className="text-3xl font-black bg-transparent border-none focus-visible:ring-0 p-0 text-white placeholder:text-slate-700"
            placeholder="Untitled Knowledge"
          />
          <Textarea 
            value={note.content} 
            onChange={(e) => setNote({...note, content: e.target.value})}
            className="min-h-125 bg-slate-900/30 border-slate-800 rounded-2xl p-6 text-slate-300 leading-relaxed text-lg focus:border-blue-600 transition-all resize-none"
            placeholder="Start expanding your thoughts..."
          />
        </div>

        {/* Sidebar Info & AI Result */}
        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800 rounded-2xl overflow-hidden">
            <CardHeader className="bg-slate-800/30 p-4 border-b border-slate-800">
              <h3 className="text-sm font-bold flex items-center gap-2 text-purple-400"><Sparkles size={16}/> AI Insight Summary</h3>
            </CardHeader>
            <CardContent className="p-5">
              {summary ? (
                <p className="text-slate-400 text-sm italic leading-loose">{summary}</p>
              ) : (
                <p className="text-slate-600 text-xs italic">Click the &apos;AI Summarize&apos; button to generate a quick overview of your note.</p>
              )}
            </CardContent>
          </Card>

          <div className="p-4 bg-slate-950 border border-slate-900 rounded-2xl space-y-4">
             <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
                <span>Created On</span>
                <span className="text-slate-300">April 6, 2026</span>
             </div>
             <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
                <span>Words</span>
                <span className="text-slate-300">{note.content.split(/\s+/).filter(Boolean).length}</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}