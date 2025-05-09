"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Info, Loader2 } from "lucide-react"; // Ensure Clock is imported
import type { Event as PrismaEvent } from "@prisma/client";

// Redesigned EventDisplayItem component

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

const EventDisplayItem: React.FC<{ event: PrismaEvent }> = ({ event }) => {
  const formatDate = (dateString: string | Date): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <article
      className="mb-16 md:mb-24 bg-black text-white py-8 md:py-12 border-b-2 border-twisted-neon/30 last:border-b-0"
      data-oid="621k1zo"
    >
      <div
        className={`container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 ${event.imageUrl ? "md:grid-cols-5" : ""} gap-8 md:gap-12 items-center`}
        data-oid="kvw_d:i"
      >
        {/* Image Section - takes more space if available */}
        {event.imageUrl && (
          <div
            className="md:col-span-2 w-full h-auto overflow-hidden rounded-lg shadow-2xl shadow-twisted-neon/30 group"
            data-oid="luyt4au"
          >
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
              data-oid="r.00cy_"
            />
          </div>
        )}

        {/* Details Section - takes remaining space or full width */}
        <div
          className={`${event.imageUrl ? "md:col-span-3" : "col-span-1"} flex flex-col justify-center`}
          data-oid="fk6db:5"
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-cyber text-twisted-neon mb-6 uppercase tracking-wide"
            data-oid="q56z3:2"
          >
            {event.title}
          </h2>

          <div
            className="text-xl md:text-2xl text-gray-200 mb-6 space-y-3"
            data-oid="-ct4.mu"
          >
            <p className="flex items-center" data-oid="9cvf5_-">
              <Calendar
                size={28}
                className="mr-4 text-twisted-neon/90 flex-shrink-0"
                data-oid="minv6z1"
              />

              <span data-oid="xmomkwt">{formatDate(event.date)}</span>
            </p>
            {event.time && (
              <p className="flex items-center" data-oid="p_46ndh">
                <Clock
                  size={28}
                  className="mr-4 text-twisted-neon/90 flex-shrink-0"
                  data-oid="h6-:ma2"
                />

                <span data-oid="_mn9r6g">{formatTime(event.time)}</span>
              </p>
            )}
          </div>

          {event.djs && (
            <div className="mb-6" data-oid="_3tamtf">
              <h3
                className="text-2xl md:text-3xl font-semibold text-yellow-400 mb-2"
                data-oid="f.6cstr"
              >
                DJs
              </h3>
              <p
                className="text-lg md:text-xl text-gray-300 whitespace-pre-line"
                data-oid="as3:2k9"
              >
                {event.djs}
              </p>
            </div>
          )}

          {event.specials && (
            <div className="mb-6" data-oid="_1xe42h">
              <h3
                className="text-2xl md:text-3xl font-semibold text-yellow-400 mb-2"
                data-oid="2qx6ciy"
              >
                Specials
              </h3>
              <p
                className="text-lg md:text-xl text-gray-300 whitespace-pre-line"
                data-oid="o6wvg8l"
              >
                {event.specials}
              </p>
            </div>
          )}

          <div
            className="mt-auto pt-6 border-t-2 border-gray-700/50"
            data-oid="7uyhv53"
          >
            <p
              className="text-lg md:text-xl text-gray-400 flex items-center"
              data-oid="_oo_g8t"
            >
              <MapPin
                size={24}
                className="mr-3 text-twisted-neon/90 flex-shrink-0"
                data-oid="sk.4o6z"
              />
              <span data-oid="s4.jjlm">
                1640 S Blue Island Ave, Chicago, IL 60608
              </span>{" "}
              {/* Assuming fixed location */}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default function EventsPage() {
  const [events, setEvents] = useState<PrismaEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/events");
        if (!response.ok) {
          throw new Error(
            `Failed to fetch events: ${response.statusText} (${response.status})`,
          );
        }
        const data: PrismaEvent[] = await response.json();

        const now = new Date();
        const upcomingEvents = data
          .filter((event) => new Date(event.date) >= now)
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
          );

        const pastEvents = data
          .filter((event) => new Date(event.date) < now)
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          );

        setEvents([...upcomingEvents, ...pastEvents]);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An unknown error occurred while fetching events.",
        );
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllEvents();
  }, []);

  return (
    <main className="mt-20 min-h-screen bg-black text-white" data-oid="861l1ar">
      <h1
        className="text-5xl md:text-6xl lg:text-7xl font-cyber text-twisted-neon pt-12 md:pt-16 pb-8 md:pb-12 text-center uppercase tracking-wider"
        data-oid="ffdt-n1"
      >
        Events
      </h1>

      {loading && (
        <div
          className="flex flex-col justify-center items-center p-10 text-twisted-neon"
          data-oid="q4sb4o7"
        >
          <Loader2
            className="h-12 w-12 md:h-16 md:w-16 mb-4 animate-spin"
            data-oid="ijwv2ey"
          />

          <p className="text-xl md:text-2xl font-semibold" data-oid="3zvw9k8">
            Loading Events...
          </p>
        </div>
      )}

      {error && (
        <div
          className="flex flex-col justify-center items-center p-10 text-red-400 bg-red-900/40 border-2 border-red-600/70 rounded-lg max-w-2xl mx-auto shadow-lg"
          data-oid="f:7rdcx"
        >
          <Info
            size={36}
            className="mb-3 md:mb-4 text-red-500"
            data-oid="5w7tajz"
          />

          <p
            className="text-xl md:text-2xl font-semibold mb-2 text-red-300"
            data-oid="0.0nrsv"
          >
            Error Loading Events
          </p>
          <p className="text-center text-red-400 text-sm" data-oid="0s2t3dx">
            {error}
          </p>
        </div>
      )}

      {!loading && !error && events.length === 0 && (
        <div
          className="text-center text-gray-400 p-10 bg-gray-800/60 rounded-lg max-w-md mx-auto shadow-md border border-gray-700/50"
          data-oid="0vyp3bf"
        >
          <Calendar
            size={48}
            className="mx-auto mb-5 text-gray-500"
            data-oid="dt4npin"
          />

          <p
            className="text-2xl font-semibold text-gray-300 mb-2"
            data-oid="eq8r7sj"
          >
            No Events Found
          </p>
          <p className="text-gray-400" data-oid="dxu:ha8">
            There are currently no events scheduled. Please check back soon!
          </p>
        </div>
      )}

      {!loading && !error && events.length > 0 && (
        <div className="w-full" data-oid="v7sv1jk">
          {events.map((event) => (
            <EventDisplayItem key={event.id} event={event} data-oid="zt0ofk-" />
          ))}
        </div>
      )}
    </main>
  );
}
