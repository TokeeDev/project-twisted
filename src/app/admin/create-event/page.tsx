'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import EventForm from '@/components/admin/EventForm';
import { useRouter } from 'next/navigation';

export default function CreateEventPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-4 md:p-8">
      <div className="container mx-auto max-w-4xl">
        <Link href="/admin/events" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6 text-sm font-medium">
          <ArrowLeft size={16} className="mr-1" />
          Back to Event Management
        </Link>
        {/* EventForm includes its own title 'Create New Event' */}
        <EventForm 
          onSuccess={() => {
            // Redirect to the events list after successful creation
            router.push('/admin/events');
          }}
        />
      </div>
    </div>
  );
}