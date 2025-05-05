"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Info, Loader2 } from "lucide-react"; // Added icons
import type { Event as PrismaEvent } from "@prisma/client"; // Rename imported Event type

// Define the structure of an event object based on Prisma schema
// We already imported PrismaEvent, so we can use that directly or extend it if needed

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
      data-oid="v-do5x7"
    >
      {event.imageUrl && (
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-48 object-cover"
          data-oid="izt.j9o"
        />
      )}
      <div className="p-6 flex flex-col flex-grow" data-oid="lb6lras">
        <h2
          className="text-2xl font-semibold text-twisted-neon mb-2"
          data-oid="3wl6oip"
        >
          {event.title}
        </h2>
        <div
          className="text-sm text-gray-400 mb-3 space-y-1"
          data-oid="9lglq9a"
        >
          <p className="flex items-center" data-oid="wa.zts-">
            <Calendar size={14} className="mr-2" data-oid="jotb4qi" />{" "}
            {formatDate(event.date)}
          </p>
          {event.time && (
            <p className="flex items-center" data-oid="10:o825">
              <Clock size={14} className="mr-2" data-oid="1m38vxr" />{" "}
              {event.time}
            </p>
          )}
        </div>
        {event.description && (
          <p
            className="text-gray-300 mb-4 text-sm flex-grow line-clamp-3"
            data-oid=".fhihnl"
          >
            {event.description}
          </p>
        )}
        <p
          className="text-xs text-gray-500 flex items-center mt-auto pt-4 border-t border-gray-700/50"
          data-oid="g:hop.-"
        >
          <MapPin size={14} className="mr-1" data-oid="vz45odv" />
          1640 S Blue Island Ave, Chicago, IL 60608{" "}
          {/* Assuming fixed location */}
        </p>
        {/* Optionally display DJs, Specials, etc. */}
        {/* {event.djs && <p className="text-xs text-gray-400 mt-1">DJs: {event.djs}</p>} */}
        {/* {event.specials && <p className="text-xs text-gray-400 mt-1">Specials: {event.specials}</p>} */}
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
        data-oid="t9i5-3o"
      >
        <Loader2 className="h-6 w-6 mr-2 animate-spin" data-oid="cj9ikcg" />
        Loading events...
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex justify-center items-center p-8 text-red-400 bg-red-900/20 border border-red-600 rounded-md"
        data-oid="xui5ci3"
      >
        <Info size={18} className="mr-2" data-oid="wq8v9r." />
        Error loading events: {error}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div
        className="text-center text-gray-400 p-8 bg-gray-800/30 rounded-md border border-gray-700"
        data-oid="jao9uhh"
      >
        No {filter || ""} events found. Check back soon!
      </div>
    );
  }

  return (
    <div
      className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      data-oid="xym8ep-"
    >
      {events.map((event) => (
        <EventCard key={event.id} event={event} data-oid="hahe_ya" />
      ))}
    </div>
  );
};

export default EventList;
