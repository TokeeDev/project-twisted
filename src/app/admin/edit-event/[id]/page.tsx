"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import EventForm from "@/components/admin/EventForm";
import { useRouter } from "next/navigation";

interface EditEventPageProps {
  params: {
    id: string; // The event ID from the URL
  };
}

export default function EditEventPage({ params }: EditEventPageProps) {
  const router = useRouter();
  const { id } = params;

  return (
    <div
      className="min-h-screen bg-gray-100 text-gray-900 p-4 md:p-8"
      data-oid="qp5i2o2"
    >
      <div className="container mx-auto max-w-4xl" data-oid="9f4ckw.">
        <Link
          href="/admin/events"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6 text-sm font-medium"
          data-oid="nyr5r9e"
        >
          <ArrowLeft size={16} className="mr-1" data-oid="-fok5uq" />
          Back to Event Management
        </Link>
        {/* EventForm includes its own title 'Edit Event' when eventId is provided */}
        <EventForm
          eventId={id} // Pass the event ID to the form for editing
          onSuccess={() => {
            // Redirect to the events list after successful update
            router.push("/admin/events");
          }}
          data-oid="roxtfs6"
        />
      </div>
    </div>
  );
}
