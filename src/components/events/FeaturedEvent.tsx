'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Music, Tag, Loader2, AlertTriangle } from 'lucide-react';
import type { Event } from '@prisma/client'; // Import the Event type from Prisma

// Helper function to format date
const formatDate = (dateString: string | Date): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long', // e.g., Friday
    month: 'long', // e.g., July
    day: 'numeric', // e.g., 19
  });
};

const FeaturedEvent: React.FC = () => {
  const [featuredEvent, setFeaturedEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedEvent = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/events?featured=true');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const events: Event[] = await response.json();
        // Assuming only one event should be featured, take the first one
        // Or implement logic to select the *most* relevant featured event if multiple are returned
        if (events.length > 0) {
          setFeaturedEvent(events[0]);
        } else {
          setFeaturedEvent(null); // No featured event found
        }
      } catch (err) {
        console.error('Failed to fetch featured event:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedEvent();
  }, []);

  if (isLoading) {
    return (
      <section className="bg-gradient-to-b from-black via-gray-900 to-black text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-twisted-neon mx-auto" />
          <p className="mt-4 text-xl">Loading Featured Event...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gradient-to-b from-black via-gray-900 to-black text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-400 border border-red-600 bg-red-900/30 p-4 rounded-md max-w-md mx-auto">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-red-500" />
            <p>Error loading featured event: {error}</p>
            <p>Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  if (!featuredEvent) {
    return (
      <section className="bg-gradient-to-b from-black via-gray-900 to-black text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-twisted-neon">Upcoming Events</h2>
          <p className="text-gray-400">No featured event scheduled right now. Check back soon!</p>
        </div>
      </section>
    );
  }

  // Safely split DJs and Specials, handling null or empty strings
  const djsList = featuredEvent.djs?.split(',').map(dj => dj.trim()).filter(dj => dj) || [];
  const specialsList = featuredEvent.specials?.split(';').map(sp => sp.trim()).filter(sp => sp) || [];

  return (
    <section id="events" className="bg-gradient-to-b from-black via-gray-900 to-black text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-twisted-neon">Featured Event</h2>
        {/* Explicitly set flex-col for mobile (default) and md:flex-row for desktop */}
        <div className="bg-gray-800/50 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row border border-gray-700">
          {/* Event Image (Left Column on Desktop) */}
          {/* Ensure image takes full width on mobile and half on desktop */}
          <div className="w-full md:w-1/2 relative aspect-[9/16] md:aspect-auto">
            {featuredEvent.imageUrl && (
              <Image
                src={featuredEvent.imageUrl} // Use dynamic image URL
                alt={featuredEvent.title}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-30 md:bg-opacity-10"></div> {/* Subtle overlay */}
          </div>

          {/* Event Details (Right Column on Desktop) */}
          {/* Ensure details take full width on mobile and half on desktop */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">{featuredEvent.title}</h3>
              {featuredEvent.description && (
                <p className="text-gray-300 mb-4 text-sm md:text-base">{featuredEvent.description}</p>
              )}

              <div className="space-y-3 text-sm md:text-base text-gray-300 mb-6">
                <div className="flex items-center">
                  <Calendar size={18} className="mr-3 text-twisted-neon flex-shrink-0" />
                  <span>{formatDate(featuredEvent.date)}</span>
                </div>
                {featuredEvent.time && (
                  <div className="flex items-center">
                    <Clock size={18} className="mr-3 text-twisted-neon flex-shrink-0" />
                    <span>{featuredEvent.time}</span>
                  </div>
                )}
                <div className="flex items-start">
                  <MapPin size={18} className="mr-3 mt-0.5 text-twisted-neon flex-shrink-0" />
                  <span>1640 S Blue Island Ave, Chicago, IL 60608</span>
                </div>
                {djsList.length > 0 && (
                  <div className="flex items-start">
                    <Music size={18} className="mr-3 mt-0.5 text-twisted-neon flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-200">Music by:</span>
                      <ul className="list-disc list-inside ml-1">
                        {djsList.map((dj, index) => <li key={index}>{dj}</li>)}
                      </ul>
                    </div>
                  </div>
                )}
                {(featuredEvent.happyHourTime || specialsList.length > 0) && (
                  <div className="flex items-start pt-2 border-t border-gray-700/50 mt-3">
                    <Tag size={18} className="mr-3 mt-0.5 text-twisted-neon flex-shrink-0" />
                    <div>
                      {featuredEvent.happyHourTime && (
                        <p><span className="font-semibold text-gray-200">Happy Hour:</span> {featuredEvent.happyHourTime}</p>
                      )}
                      {specialsList.length > 0 && (
                        <div className="mt-1">
                          <span className="font-semibold text-gray-200">Specials:</span>
                          <ul className="list-disc list-inside ml-1">
                            {specialsList.map((special, index) => <li key={index}>{special}</li>)}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Call to Action / Link */}
            <div className="mt-auto">
              <Link href="/events">
                <a className="inline-block bg-twisted-neon text-black font-semibold px-6 py-3 rounded-md hover:bg-twisted-neon/80 transition duration-200 text-center w-full md:w-auto">
                  View All Events
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvent;