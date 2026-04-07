"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MoveRight } from "lucide-react"; // Import a cool icon

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/login");
      } else {
        const data = await res.json();
        setError(data.error || "Registration failed. Email might exist.");
      }
    } catch (err) {
      setError("Server connection failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Background Glows for Premium Look */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[150px] rounded-full -z-10" />

      <Card className="w-full max-w-lg bg-slate-900 border-slate-800 text-white shadow-[0_0_60px_rgba(0,0,0,0.5)] rounded-3xl p-4">
        <CardHeader className="space-y-2 pb-8">
          <p className="text-blue-400 font-bold tracking-widest uppercase text-[10px] sm:text-xs text-center">
            New Era of Learning
          </p>
          <CardTitle className="text-4xl md:text-5xl font-extrabold tracking-tighter text-center leading-tight">
            Create an <span className="text-blue-400">Account</span>
          </CardTitle>
          <CardDescription className="text-slate-400 text-center text-sm md:text-base max-w-sm mx-auto pt-1">
            Fill your details to unlock a personalized, AI-powered study experience.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Input fields are now larger and darker */}
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Full Name"
                className="bg-slate-950 border-slate-700/60 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-white placeholder:text-slate-500 h-16 rounded-2xl text-lg px-6 transition-all hover:border-slate-600"
                required
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email Address"
                className="bg-slate-950 border-slate-700/60 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-white placeholder:text-slate-500 h-16 rounded-2xl text-lg px-6 transition-all hover:border-slate-600"
                required
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2 relative">
              <Input
                type="password"
                placeholder="Strong Password"
                className="bg-slate-950 border-slate-700/60 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-white placeholder:text-slate-500 h-16 rounded-2xl text-lg px-6 transition-all hover:border-slate-600"
                required
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <p className="text-[10px] text-slate-500 pt-1.5 pl-2 tracking-wide">Must contain 8+ characters.</p>
            </div>

            {error && <p className="text-red-500 text-sm text-center pt-1 font-medium">{error}</p>}
            
            {/* The Ultimate Glowing Register Button */}
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-8 rounded-2xl transition-all text-xl shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] active:scale-95 flex items-center justify-center gap-3 group"
              disabled={loading}
            >
              {loading ? "Initializing..." : "Register Now"}
              <MoveRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Button>
          </form>
          
          <div className="mt-8 text-center text-slate-400 border-t border-slate-800/60 pt-6">
            <span className="text-xs">Already an early adopter?</span>{" "}
            <Link href="/login" className="text-blue-400 hover:underline font-bold text-sm tracking-tight">
              Sign in with your credentials
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}