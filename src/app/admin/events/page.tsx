"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Star,
  Info,
  Loader2,
  Calendar,
  Clock,
  Image as ImageIcon,
  AlertTriangle,
} from "lucide-react";
import type { Event } from "@prisma/client"; // Import the Event type

// Helper function to format date and time
const formatDate = (dateString: string | Date): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

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

export default function AdminEventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/events");
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data: Event[] = await response.json();
      // Initial sort: all events by date descending
      data.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      setEvents(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
      console.error("Error fetching events:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleDelete = async (eventId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this event? This action cannot be undone.",
      )
    ) {
      return;
    }
    setDeletingId(eventId);
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete event");
      }
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== eventId),
      );
      // TODO: Add a toast notification for success
    } catch (err) {
      console.error("Error deleting event:", err);
      alert(
        `Error deleting event: ${err instanceof Error ? err.message : "Unknown error"}`,
      );
      // TODO: Add a toast notification for error
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (eventId: string) => {
    router.push(`/admin/edit-event/${eventId}`);
  };

  const now = new Date();
  const upcomingEvents = events
    .filter((event) => new Date(event.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Sort upcoming: soonest first

  const pastEvents = events.filter((event) => new Date(event.date) < now);
  // Past events are already sorted by date descending from the initial sort

  const EventCard: React.FC<{ event: Event; isPast?: boolean }> = ({
    event,
    isPast,
  }) => (
    <div
      className={`bg-gray-900 border border-gray-700/50 rounded-xl shadow-xl hover:shadow-twisted-neon/30 transition-all duration-300 ease-in-out flex flex-col overflow-hidden ${isPast ? "opacity-60 hover:opacity-80" : ""}`}
      data-oid="hhjfhxx"
    >
      {event.imageUrl && (
        <div
          className="relative h-48 w-full overflow-hidden"
          data-oid="7tbgai-"
        >
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            data-oid="jd51y8m"
          />
        </div>
      )}

      <div className="p-5 flex flex-col flex-grow" data-oid="b:.o3tl">
        <h3
          className="text-xl font-semibold text-twisted-neon mb-2 truncate"
          title={event.title}
          data-oid="_ylw:e:"
        >
          {event.title}
        </h3>
        <div
          className="text-sm text-gray-400 mb-3 space-y-1"
          data-oid="9:p7ck5"
        >
          <p className="flex items-center" data-oid="-tr-:bd">
            <Calendar
              size={14}
              className="mr-2 text-twisted-neon/80"
              data-oid="fe1mu3x"
            />{" "}
            {formatDate(event.date)}
          </p>
          {event.time && (
            <p className="flex items-center" data-oid="yk5v7:g">
              <Clock
                size={14}
                className="mr-2 text-twisted-neon/80"
                data-oid="gmd.5qn"
              />{" "}
              {formatTime(event.time)}
            </p>
          )}
        </div>

        {(event.djs || event.specials) && (
          <div className="mb-4 text-xs space-y-1" data-oid="jrp6eq0">
            {event.djs && (
              <p className="text-gray-400" data-oid="ei48drj">
                <strong className="text-gray-100" data-oid="5uukb4:">
                  DJs:
                </strong>{" "}
                {event.djs}
              </p>
            )}
            {event.specials && (
              <p className="text-gray-400" data-oid="j48yng:">
                <strong className="text-gray-100" data-oid="v1d00o:">
                  Specials:
                </strong>{" "}
                {event.specials}
              </p>
            )}
          </div>
        )}
        <div
          className="mt-auto pt-4 border-t border-gray-700/50 flex space-x-2"
          data-oid="_.wj7uy"
        >
          <button
            onClick={() => handleEdit(event.id)}
            className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-twisted-neon/70 rounded-md shadow-sm text-sm font-medium text-twisted-neon bg-transparent hover:bg-twisted-neon/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-twisted-neon transition-colors duration-150"
            data-oid="8304c9y"
          >
            <Edit size={16} className="mr-2" data-oid="54h-d:9" /> Edit
          </button>
          <button
            onClick={() => handleDelete(event.id)}
            disabled={deletingId === event.id}
            className={`flex-1 inline-flex items-center justify-center px-3 py-2 border border-red-500/70 rounded-md shadow-sm text-sm font-medium text-red-400 bg-transparent transition-colors duration-150 ${deletingId === event.id ? "opacity-50 cursor-not-allowed" : "hover:bg-red-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-red-500"}`}
            data-oid="exh-0in"
          >
            {deletingId === event.id ? (
              <>
                <Loader2
                  size={16}
                  className="mr-2 animate-spin"
                  data-oid=":ys-5lt"
                />{" "}
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={16} className="mr-2" data-oid="sfz7zu4" /> Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen bg-black text-white p-4 md:p-8 font-sans mt-16"
      data-oid="5n5s3nq"
    >
      <div className="container mx-auto max-w-7xl" data-oid="63n2rit">
        <header
          className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-4 border-b border-gray-700/50"
          data-oid="10_kvn3"
        >
          <Link
            href="/admin"
            className="inline-flex items-center text-twisted-neon hover:text-twisted-neon/80 text-sm font-medium mb-4 sm:mb-0 transition-colors duration-150 group"
            data-oid="dzirz7_"
          >
            <ArrowLeft
              size={18}
              className="mr-2 group-hover:-translate-x-1 transition-transform duration-200"
              data-oid="8:65-o6"
            />
            Back to Admin Dashboard
          </Link>
          <h1
            className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-twisted-neon uppercase tracking-wider"
            data-oid="nnc9goj"
          >
            Manage Events
          </h1>
          <Link
            href="/admin/create-event"
            className="inline-flex items-center bg-twisted-neon hover:bg-twisted-neon/80 text-black font-semibold py-2.5 px-6 rounded-lg shadow-lg hover:shadow-twisted-neon/40 transition-all duration-300 transform hover:scale-105 text-sm mt-4 sm:mt-0"
            data-oid="s20dddy"
          >
            <Plus size={18} className="mr-2" data-oid="ik5r-c4" />
            Create New Event
          </Link>
        </header>

        {isLoading && (
          <div
            className="flex flex-col justify-center items-center p-10 text-twisted-neon bg-gray-800/50 rounded-lg shadow-xl"
            data-oid="_r1bcj9"
          >
            <Loader2
              className="h-12 w-12 mb-4 animate-spin"
              data-oid="-z13:4-"
            />

            <p className="text-lg" data-oid="d98mk-_">
              Loading events...
            </p>
          </div>
        )}

        {error && (
          <div
            className="p-6 mb-8 rounded-lg text-sm bg-red-900/50 text-red-300 border border-red-700 flex items-center shadow-lg"
            data-oid="38t8p5:"
          >
            <AlertTriangle
              size={20}
              className="mr-3 text-red-400"
              data-oid="w.yw13t"
            />

            <div data-oid=":2-dy-n">
              <h3 className="font-semibold text-base mb-1" data-oid="bh_liet">
                Error Fetching Events
              </h3>
              <p data-oid="zjqq0wh">{error}</p>
            </div>
          </div>
        )}

        {!isLoading && !error && (
          <div className="space-y-12" data-oid=":o0rdtd">
            <section data-oid="_d0y73t">
              <h2
                className="text-3xl font-semibold mb-6 text-twisted-neon border-b-2 border-twisted-neon/30 pb-2"
                data-oid="1nuh9v4"
              >
                Upcoming Events ({upcomingEvents.length})
              </h2>
              {upcomingEvents.length > 0 ? (
                <div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  data-oid="x:smiy1"
                >
                  {upcomingEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      data-oid="xbyxe.o"
                    />
                  ))}
                </div>
              ) : (
                <div
                  className="text-center text-gray-400 p-8 bg-gray-900/70 rounded-lg shadow-md border border-gray-700/50"
                  data-oid="yypl9-6"
                >
                  <ImageIcon
                    size={48}
                    className="mx-auto mb-4 text-gray-500"
                    data-oid="_.4.fpv"
                  />

                  <p className="text-lg" data-oid="wwzre1s">
                    No upcoming events found.
                  </p>
                  <p className="text-sm" data-oid="y.jsfoq">
                    Why not create one?
                  </p>
                </div>
              )}
            </section>

            <section data-oid="h-qrjdv">
              <h2
                className="text-3xl font-semibold mb-6 text-twisted-neon border-b-2 border-twisted-neon/30 pb-2"
                data-oid="xo4r.-d"
              >
                Past Events ({pastEvents.length})
              </h2>
              {pastEvents.length > 0 ? (
                <div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  data-oid="h5ao4q2"
                >
                  {pastEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      isPast
                      data-oid="u27gnva"
                    />
                  ))}
                </div>
              ) : (
                <div
                  className="text-center text-gray-400 p-8 bg-gray-900/70 rounded-lg shadow-md border border-gray-700/50"
                  data-oid="vxx36eb"
                >
                  <Calendar
                    size={48}
                    className="mx-auto mb-4 text-gray-500"
                    data-oid="wbodiks"
                  />

                  <p className="text-lg" data-oid="j54k1-1">
                    No past events yet.
                  </p>
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
