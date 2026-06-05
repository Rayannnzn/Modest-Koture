"use client";

import React, { useState } from "react";
import { User, Camera, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ProfilePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "Amina Al-Hassan",
    email: "amina@example.com",
    phone: "+44 7700 900123",
    bio: "Fashion enthusiast and modest wear advocate.",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <User className="h-6 w-6 text-[#c9a96e]" />
          My Profile
        </h1>
        <p className="text-muted-foreground text-sm mt-0.5">Manage your personal information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Avatar Card */}
        <div className="bg-white rounded-2xl border border-border p-6 flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {form.name.charAt(0)}
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#c9a96e] flex items-center justify-center shadow-md hover:bg-[#b8985d] transition-colors">
              <Camera className="h-3.5 w-3.5 text-white" />
            </button>
          </div>
          <h2 className="font-bold text-lg">{form.name}</h2>
          <p className="text-sm text-muted-foreground">{form.email}</p>
          <div className="mt-4 pt-4 border-t w-full grid grid-cols-3 gap-2 text-center">
            {[
              { label: "Orders", value: "12" },
              { label: "Reviews", value: "5" },
              { label: "Wishlist", value: "8" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-bold text-[#c9a96e]">{stat.value}</div>
                <div className="text-[10px] text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border p-6">
          <h2 className="font-semibold mb-5">Personal Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="profile-name">Full Name</Label>
                <Input
                  id="profile-name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-phone">Phone Number</Label>
                <Input
                  id="profile-phone"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-email">Email Address</Label>
              <Input
                id="profile-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
              <p className="text-xs text-muted-foreground">Changing your email requires verification.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-bio">Short Bio</Label>
              <textarea
                id="profile-bio"
                rows={3}
                value={form.bio}
                onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-[#c9a96e]/50 resize-none"
              />
            </div>

            <div className="pt-2 border-t">
              <Button
                type="submit"
                className="bg-[#1a1a2e] hover:bg-[#1a1a2e]/90 gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Password Section */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <h2 className="font-semibold mb-5">Change Password</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" placeholder="Min. 8 characters" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input id="confirm-password" type="password" placeholder="Repeat new password" />
          </div>
        </div>
        <Button variant="outline" size="sm" className="mt-4 gap-2">
          Update Password
        </Button>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-2xl border border-red-200 p-6">
        <h2 className="font-semibold text-red-700 mb-2">Danger Zone</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Once you delete your account, all of your data will be permanently removed. This action cannot be undone.
        </p>
        <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50">
          Delete Account
        </Button>
      </div>
    </div>
  );
}
