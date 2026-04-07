"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User, Shield, Trash2 } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8 text-white">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-slate-400">Manage your account settings and preferences.</p>
      </div>

      <Separator className="bg-slate-800" />

      <div className="grid gap-8">
        {/* Profile Section */}
        <Card className="bg-slate-900/50 border-slate-800 text-white">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-400" />
              <CardTitle>Profile Information</CardTitle>
            </div>
            <CardDescription className="text-slate-400">Update your account details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Malinda Prabath" className="bg-slate-950 border-slate-800" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" disabled defaultValue="malinda@example.com" className="bg-slate-950 border-slate-800 opacity-50" />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
          </CardContent>
        </Card>

        {/* Security Section */}
        <Card className="bg-slate-900/50 border-slate-800 text-white">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              <CardTitle>Security</CardTitle>
            </div>
            <CardDescription className="text-slate-400">Manage your password and security.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
              Change Password
            </Button>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-900/50 bg-red-950/10 text-white">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-red-500" />
              <CardTitle className="text-red-500">Danger Zone</CardTitle>
            </div>
            <CardDescription className="text-slate-400">Permanently delete your account and all notes.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive">Delete Account</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}