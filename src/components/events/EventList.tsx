"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Info, Loader2 } from "lucide-react"; // Added icons
import type { Event as PrismaEvent } from "@prisma/client"; // Rename imported Event type

// Define the structure of an event object based on Prisma schema
// We already imported PrismaEvent, so we can use that directly or extend it if needed

// Helper function to format time
const formatTime = (timeString: string): string => {
  const [hours, minutes] = timeString.split(":");
  const date = new Date();
  date.setHours(parseInt(hours, 10));
  date.setMinutes(parseInt(minutes, 10));
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/Chicago",
  });
};

const EventCard: React.FC<{ event: PrismaEvent }> = ({ event }) => {
  // Helper to format date
  const formatDate = (dateString: string | Date): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-twisted-neon/30 transition-shadow duration-300 flex flex-col"
      data-oid="pqq3cjk"
    >
      {event.imageUrl && (
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-48 object-cover"
          data-oid="ae7cteq"
        />
      )}
      <div className="p-6 flex flex-col flex-grow" data-oid="qtylcy6">
        <h2
          className="text-2xl font-semibold text-twisted-neon mb-2"
          data-oid="zwk53n5"
        >
          {event.title}
        </h2>
        <div
          className="text-sm text-gray-400 mb-3 space-y-1"
          data-oid="6869g6v"
        >
          <p className="flex items-center" data-oid="utsjqlb">
            <Calendar size={14} className="mr-2" data-oid="r32sal6" />{" "}
            {formatDate(event.date)}
          </p>
          {event.time && (
            <p className="flex items-center" data-oid="1t2tokt">
              <Clock size={14} className="mr-2" data-oid="k54_y5e" />{" "}
              {formatTime(event.time)}
            </p>
          )}
        </div>
        
        <p
          className="text-xs text-gray-500 flex items-center mt-auto pt-4 border-t border-gray-700/50"
          data-oid="je1jsjj"
        >
          <MapPin size={14} className="mr-1" data-oid="l:rltnw" />
          1640 S Blue Island Ave, Chicago, IL 60608{" "}
          {/* Assuming fixed location */}
        </p>
        {/* Optionally display DJs, Specials, etc. */}
        {(() => {
          const validDjs = Array.isArray(event.djs) ? event.djs.filter(dj => dj && dj.trim() !== '') : [];
          if (validDjs.length > 0) {
            return (
              <p className="text-xs text-gray-400 mt-1">
                DJs: {validDjs.join(', ')}
              </p>
            );
          }
          return null;
        })()}
        {(() => {
          const validSpecials = Array.isArray(event.specials) ? event.specials.filter(special => special && special.trim() !== '') : [];
          if (validSpecials.length > 0) {
            return (
              <p className="text-xs text-gray-400 mt-1">
                Specials: {validSpecials.join(', ')}
              </p>
            );
          }
          return null;
        })()}
      </div>
    </div>
  );
};

interface EventListProps {
  filter?: "upcoming" | "past"; // Optional filter
}

const EventList: React.FC<EventListProps> = ({ filter }) => {
  const [events, setEvents] = useState<PrismaEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/events"); // Fetch from the API route
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        let data: PrismaEvent[] = await response.json();

        // Apply filtering if specified
        const now = new Date();
        if (filter === "upcoming") {
          data = data.filter((event) => new Date(event.date) >= now);
        } else if (filter === "past") {
          data = data.filter((event) => new Date(event.date) < now);
        }

        // Sort events: upcoming ascending, past descending
        data.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return filter === "past" ? dateB - dateA : dateA - dateB;
        });

        setEvents(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [filter]); // Re-fetch if filter changes

  if (loading) {
    return (
      <div
        className="flex justify-center items-center p-8 text-twisted-neon"
        data-oid="6g9hsid"
      >
        <Loader2 className="h-6 w-6 mr-2 animate-spin" data-oid="9ddxeu2" />
        Loading events...
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex justify-center items-center p-8 text-red-400 bg-red-900/20 border border-red-600 rounded-md"
        data-oid="xyc5pfr"
      >
        <Info size={18} className="mr-2" data-oid=":h3831u" />
        Error loading events: {error}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div
        className="text-center text-gray-400 p-8 bg-gray-800/30 rounded-md border border-gray-700"
        data-oid="hu01_5l"
      >
        No {filter || ""} events found. Check back soon!
      </div>
    );
  }

  return (
    <div
      className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      data-oid="td9pzvu"
    >
      {events.map((event) => (
        <EventCard key={event.id} event={event} data-oid="6iblvy-" />
      ))}
    </div>
  );
};

export default EventList;
