"use client";
import MenuItemForm from "@/components/admin/MenuItemForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AdminMenuPage() {
  return (
    <div
      className="min-h-screen bg-black text-white p-4 md:p-8"
      data-oid="kdtdlqv"
    >
      <div className="container mx-auto max-w-3xl" data-oid="z3v6w5p">
        <Link
          href="/admin"
          className="inline-flex items-center text-twisted-neon hover:text-twisted-neon/80 mb-6 text-sm"
          data-oid="_q8krth"
        >
          <ArrowLeft size={16} className="mr-1" data-oid="um8rkrt" />
          Back to Admin Dashboard
        </Link>
        <h1
          className="text-3xl font-bold mb-8 text-center text-twisted-neon"
          data-oid="ti:e4ll"
        >
          Manage Menu Items
        </h1>

        {/* Form for adding new items */}
        <MenuItemForm
          onSuccess={() => {
            // Optional: Add logic here if needed after successful creation,
            // like redirecting or showing a persistent success message.
            console.log("Menu item created successfully from admin page!");
          }}
          data-oid="qc88d9z"
        />

        {/* TODO: Add a section here to list/edit/delete existing menu items */}
        {/* This would typically involve fetching items from /api/menu-items */}
        {/* and rendering them in a table or list with edit/delete buttons */}
      </div>
    </div>
  );
}
