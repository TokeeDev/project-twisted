'use client';

import React, { useState, useEffect } from 'react';
import EventList from '@/components/events/EventList';
import { Star, Calendar, Clock, MapPin, Info, Loader2 } from 'lucide-react';
import type { Event as PrismaEvent } from '@prisma/client';

// Reusable EventCard component (similar to the one in EventList, could be extracted)
const EventCard: React.FC<{ event: PrismaEvent }> = ({ event }) => {
  const formatDate = (dateString: string | Date): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-twisted-neon/30 transition-shadow duration-300 flex flex-col h-full">
      {event.imageUrl && (
        <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover" />
      )}
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-2xl font-semibold text-twisted-neon mb-2">{event.title}</h2>
        <div className="text-sm text-gray-400 mb-3 space-y-1">
          <p className="flex items-center"><Calendar size={14} className="mr-2" /> {formatDate(event.date)}</p>
          {event.time && <p className="flex items-center"><Clock size={14} className="mr-2" /> {event.time}</p>}
        </div>
        {event.description && (
          <p className="text-gray-300 mb-4 text-sm flex-grow line-clamp-4">{event.description}</p>
        )}
        <p className="text-xs text-gray-500 flex items-center mt-auto pt-4 border-t border-gray-700/50">
          <MapPin size={14} className="mr-1" />
          1640 S Blue Island Ave, Chicago, IL 60608 {/* Assuming fixed location */}
        </p>
      </div>
    </div>
  );
};

export default function EventsPage() {
  const [featuredEvent, setFeaturedEvent] = useState<PrismaEvent | null>(null);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [errorFeatured, setErrorFeatured] = useState<string | null>(null);

  useEffect(() => {
    // Fetch only the featured event
    const fetchFeaturedEvent = async () => {
      setLoadingFeatured(true);
      setErrorFeatured(null);
      try {
        const response = await fetch('/api/events?featured=true'); // Use query param
        if (!response.ok) {
          throw new Error('Failed to fetch featured event');
        }
        const data: PrismaEvent[] = await response.json();
        setFeaturedEvent(data.length > 0 ? data[0] : null); // Assuming only one featured event
      } catch (err) {
        setErrorFeatured(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching featured event:', err);
      } finally {
        setLoadingFeatured(false);
      }
    };

    fetchFeaturedEvent();
  }, []);

  return (
    <main className="min-h-screen container mx-auto px-4 py-12 text-white">
      <h1 className="text-4xl font-cyber text-twisted-neon mb-12 text-center">Events</h1>

      {/* Featured Event Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-yellow-400 mb-6 flex items-center justify-center">
          <Star size={24} className="mr-3" /> Featured Event
        </h2>
        {loadingFeatured && (
          <div className="flex justify-center items-center p-8 text-twisted-neon">
            <Loader2 className="h-6 w-6 mr-2 animate-spin" />
            Loading featured event...
          </div>
        )}
        {errorFeatured && (
           <div className="flex justify-center items-center p-8 text-red-400 bg-red-900/20 border border-red-600 rounded-md">
            <Info size={18} className="mr-2" />
            Error loading featured event: {errorFeatured}
          </div>
        )}
        {!loadingFeatured && featuredEvent && (
          <div className="max-w-3xl mx-auto">
             <EventCard event={featuredEvent} />
          </div>
        )}
         {!loadingFeatured && !featuredEvent && !errorFeatured && (
          <p className="text-center text-gray-400 italic">No featured event currently.</p>
        )}
      </section>

      {/* Upcoming Events Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-twisted-neon mb-6 text-center">Upcoming Events</h2>
        <EventList filter="upcoming" />
      </section>

      {/* Past Events Section */}
      <section>
        <h2 className="text-3xl font-semibold text-gray-500 mb-6 text-center">Past Events</h2>
        <EventList filter="past" />
      </section>
    </main>
  );
}