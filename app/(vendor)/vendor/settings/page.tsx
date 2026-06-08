"use client";

import React, { useState } from "react";
import { Settings, Save, Loader2, Upload, Globe, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function VendorSettingsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);
    toast.success("Store settings saved!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Settings className="h-6 w-6 text-[#c9a96e]" />
            Store Settings
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">Manage your storefront and business details</p>
        </div>
        <Button
          form="settings-form"
          type="submit"
          size="sm"
          className="bg-[#1a1a2e] gap-1.5"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <><Loader2 className="h-4 w-4 animate-spin" />Saving...</>
          ) : (
            <><Save className="h-4 w-4" />Save Settings</>
          )}
        </Button>
      </div>

      <form id="settings-form" onSubmit={handleSubmit} className="space-y-5">
        {/* Store Identity */}
        <div className="bg-white rounded-2xl border border-border p-5 space-y-4">
          <h2 className="font-semibold">Store Identity</h2>
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-xl bg-muted flex items-center justify-center border-2 border-dashed border-border hover:border-[#c9a96e]/50 cursor-pointer relative group">
              <Upload className="h-6 w-6 text-muted-foreground/50 group-hover:text-[#c9a96e]" />
              <span className="absolute -bottom-5 text-xs text-muted-foreground whitespace-nowrap">Store Logo</span>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="store-name">Store Name *</Label>
                <Input id="store-name" defaultValue="My Modest Store" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-slug">Store URL Slug</Label>
                <div className="flex">
                  <span className="px-3 py-2 text-xs bg-muted border border-r-0 border-input rounded-l-lg text-muted-foreground">modestkouture.com/store/</span>
                  <Input id="store-slug" defaultValue="my-modest-store" className="rounded-l-none" />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="store-bio">Store Description</Label>
            <textarea
              id="store-bio"
              rows={3}
              defaultValue="Premium modest wear for the modern woman."
              className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-[#c9a96e]/50 resize-none"
            />
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-2xl border border-border p-5 space-y-4">
          <h2 className="font-semibold">Contact Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="store-email" className="flex items-center gap-1.5 text-sm">
                <Mail className="h-3.5 w-3.5" />Email
              </Label>
              <Input id="store-email" type="email" defaultValue="vendor@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-phone" className="flex items-center gap-1.5 text-sm">
                <Phone className="h-3.5 w-3.5" />Phone
              </Label>
              <Input id="store-phone" defaultValue="+44 7700 900000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-website" className="flex items-center gap-1.5 text-sm">
                <Globe className="h-3.5 w-3.5" />Website
              </Label>
              <Input id="store-website" placeholder="https://yourwebsite.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-address" className="flex items-center gap-1.5 text-sm">
                <MapPin className="h-3.5 w-3.5" />Business Address
              </Label>
              <Input id="store-address" defaultValue="London, UK" />
            </div>
          </div>
        </div>

        {/* Payout */}
        <div className="bg-white rounded-2xl border border-border p-5 space-y-4">
          <h2 className="font-semibold">Payout Settings</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bank-name">Bank Name</Label>
              <Input id="bank-name" defaultValue="HSBC UK" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="account-number">Account Number</Label>
              <Input id="account-number" defaultValue="****4821" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sort-code">Sort Code</Label>
              <Input id="sort-code" defaultValue="**-**-**" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="account-holder">Account Holder</Label>
              <Input id="account-holder" defaultValue="Amina Al-Hassan" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
