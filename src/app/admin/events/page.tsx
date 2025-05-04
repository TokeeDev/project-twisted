'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Edit, Trash2, Star, Info, Loader2 } from 'lucide-react';
import type { Event } from '@prisma/client'; // Import the Event type

// Helper function to format date
const formatDate = (dateString: string | Date): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function AdminEventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null); // Track which event is being deleted

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/events');
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data: Event[] = await response.json();
      setEvents(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())); // Sort descending by date
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error fetching events:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleDelete = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      return;
    }
    setDeletingId(eventId);
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete event');
      }
      // Refresh events list after successful deletion
      setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
      // Optionally show a success message
    } catch (err) {
      console.error('Error deleting event:', err);
      alert(`Error deleting event: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (eventId: string) => {
    router.push(`/admin/edit-event/${eventId}`); // Navigate to a dedicated edit page
  };

  const now = new Date();
  const upcomingEvents = events.filter(event => new Date(event.date) >= now);
  const pastEvents = events.filter(event => new Date(event.date) < now);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-4 md:p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <Link href="/admin" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            <ArrowLeft size={16} className="mr-1" />
            Back to Admin Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Manage Events</h1>
          <Link href="/admin/create-event" className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-sm text-sm">
            <Plus size={16} className="mr-1" />
            Create New Event
          </Link>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center p-6 bg-white rounded-lg shadow">
            <Loader2 className="h-6 w-6 mr-2 animate-spin text-indigo-600" />
            Loading events...
          </div>
        )}

        {error && (
          <div className="p-4 mb-6 rounded-md text-sm bg-red-50 text-red-700 border border-red-200 flex items-center">
            <Info size={16} className="mr-2" /> Error: {error}
          </div>
        )}

        {!isLoading && !error && (
          <div className="space-y-8">
            {/* Upcoming Events Section */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">Upcoming Events</h2>
              {upcomingEvents.length > 0 ? (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <ul className="divide-y divide-gray-200">
                    {upcomingEvents.map((event) => (
                      <li key={event.id} className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-gray-50">
                        <div className="flex-grow mb-2 md:mb-0 md:mr-4">
                          <div className="flex items-center">
                            <span className="font-semibold text-lg text-gray-800">{event.title}</span>
                            {event.featured && (
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                <Star size={12} className="mr-1" /> Featured
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{formatDate(event.date)} {event.time ? `at ${event.time}` : ''}</p>
                          {event.description && <p className="text-sm text-gray-500 mt-1 truncate">{event.description}</p>}
                        </div>
                        <div className="flex-shrink-0 flex space-x-2">
                          <button
                            onClick={() => handleEdit(event.id)}
                            className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <Edit size={14} className="mr-1" /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(event.id)}
                            disabled={deletingId === event.id}
                            className={`inline-flex items-center px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${deletingId === event.id ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'}`}
                          >
                            {deletingId === event.id ? (
                              <><Loader2 size={14} className="mr-1 animate-spin" /> Deleting...</>
                            ) : (
                              <><Trash2 size={14} className="mr-1" /> Delete</>
                            )}
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-gray-500 italic bg-white p-4 rounded-lg shadow">No upcoming events found.</p>
              )}
            </section>

            {/* Past Events Section */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">Past Events</h2>
              {pastEvents.length > 0 ? (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <ul className="divide-y divide-gray-200">
                    {pastEvents.map((event) => (
                      <li key={event.id} className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-gray-50 opacity-70">
                         <div className="flex-grow mb-2 md:mb-0 md:mr-4">
                          <span className="font-semibold text-lg text-gray-600">{event.title}</span>
                          <p className="text-sm text-gray-500">{formatDate(event.date)} {event.time ? `at ${event.time}` : ''}</p>
                        </div>
                        <div className="flex-shrink-0 flex space-x-2">
                           <button
                            onClick={() => handleEdit(event.id)}
                            className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <Edit size={14} className="mr-1" /> View/Edit
                          </button>
                          <button
                            onClick={() => handleDelete(event.id)}
                            disabled={deletingId === event.id}
                            className={`inline-flex items-center px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${deletingId === event.id ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'}`}
                          >
                             {deletingId === event.id ? (
                              <><Loader2 size={14} className="mr-1 animate-spin" /> Deleting...</>
                            ) : (
                              <><Trash2 size={14} className="mr-1" /> Delete</>
                            )}
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-gray-500 italic bg-white p-4 rounded-lg shadow">No past events found.</p>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}