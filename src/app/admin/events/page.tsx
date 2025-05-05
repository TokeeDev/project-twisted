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
} from "lucide-react";
import type { Event } from "@prisma/client"; // Import the Event type

// Helper function to format date
const formatDate = (dateString: string | Date): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
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
      const response = await fetch("/api/events");
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data: Event[] = await response.json();
      setEvents(
        data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        ),
      ); // Sort descending by date
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
      // Refresh events list after successful deletion
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== eventId),
      );
      // Optionally show a success message
    } catch (err) {
      console.error("Error deleting event:", err);
      alert(
        `Error deleting event: ${err instanceof Error ? err.message : "Unknown error"}`,
      );
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (eventId: string) => {
    router.push(`/admin/edit-event/${eventId}`); // Navigate to a dedicated edit page
  };

  const now = new Date();
  const upcomingEvents = events.filter((event) => new Date(event.date) >= now);
  const pastEvents = events.filter((event) => new Date(event.date) < now);

  return (
    <div
      className="min-h-screen bg-gray-100 text-gray-900 p-4 md:p-8"
      data-oid="webg-0u"
    >
      <div className="container mx-auto max-w-6xl" data-oid="v1a5a5l">
        <div
          className="flex justify-between items-center mb-6"
          data-oid="aqpqdk8"
        >
          <Link
            href="/admin"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            data-oid="u:pbd9b"
          >
            <ArrowLeft size={16} className="mr-1" data-oid="tyx8kac" />
            Back to Admin Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-800" data-oid="7xim:s9">
            Manage Events
          </h1>
          <Link
            href="/admin/create-event"
            className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-sm text-sm"
            data-oid="i0ohhts"
          >
            <Plus size={16} className="mr-1" data-oid="d9us.h." />
            Create New Event
          </Link>
        </div>

        {isLoading && (
          <div
            className="flex justify-center items-center p-6 bg-white rounded-lg shadow"
            data-oid="j.zmgmm"
          >
            <Loader2
              className="h-6 w-6 mr-2 animate-spin text-indigo-600"
              data-oid="b52b40z"
            />
            Loading events...
          </div>
        )}

        {error && (
          <div
            className="p-4 mb-6 rounded-md text-sm bg-red-50 text-red-700 border border-red-200 flex items-center"
            data-oid="pev9.0f"
          >
            <Info size={16} className="mr-2" data-oid="jrrvqvz" /> Error:{" "}
            {error}
          </div>
        )}

        {!isLoading && !error && (
          <div className="space-y-8" data-oid="_6kv7bu">
            {/* Upcoming Events Section */}
            <section data-oid="2xzsvur">
              <h2
                className="text-2xl font-semibold mb-4 text-gray-700"
                data-oid="6cv7teq"
              >
                Upcoming Events
              </h2>
              {upcomingEvents.length > 0 ? (
                <div
                  className="bg-white rounded-lg shadow overflow-hidden"
                  data-oid="85it9:f"
                >
                  <ul className="divide-y divide-gray-200" data-oid="11lk5ql">
                    {upcomingEvents.map((event) => (
                      <li
                        key={event.id}
                        className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-gray-50"
                        data-oid="jnki-9g"
                      >
                        <div
                          className="flex-grow mb-2 md:mb-0 md:mr-4"
                          data-oid="hws2wvg"
                        >
                          <div className="flex items-center" data-oid="xf:5_r6">
                            <span
                              className="font-semibold text-lg text-gray-800"
                              data-oid="w2awoa5"
                            >
                              {event.title}
                            </span>
                            {event.featured && (
                              <span
                                className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
                                data-oid="ix:ebzc"
                              >
                                <Star
                                  size={12}
                                  className="mr-1"
                                  data-oid="-r:3pgu"
                                />{" "}
                                Featured
                              </span>
                            )}
                          </div>
                          <p
                            className="text-sm text-gray-600"
                            data-oid="8r30xxa"
                          >
                            {formatDate(event.date)}{" "}
                            {event.time ? `at ${event.time}` : ""}
                          </p>
                          {event.description && (
                            <p
                              className="text-sm text-gray-500 mt-1 truncate"
                              data-oid="0rsvk2f"
                            >
                              {event.description}
                            </p>
                          )}
                        </div>
                        <div
                          className="flex-shrink-0 flex space-x-2"
                          data-oid="y67cqsm"
                        >
                          <button
                            onClick={() => handleEdit(event.id)}
                            className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            data-oid="cz.88mv"
                          >
                            <Edit
                              size={14}
                              className="mr-1"
                              data-oid="c80a-j4"
                            />{" "}
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(event.id)}
                            disabled={deletingId === event.id}
                            className={`inline-flex items-center px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${deletingId === event.id ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"}`}
                            data-oid="9cd::ic"
                          >
                            {deletingId === event.id ? (
                              <>
                                <Loader2
                                  size={14}
                                  className="mr-1 animate-spin"
                                  data-oid="v0y_015"
                                />{" "}
                                Deleting...
                              </>
                            ) : (
                              <>
                                <Trash2
                                  size={14}
                                  className="mr-1"
                                  data-oid="ui4nx0g"
                                />{" "}
                                Delete
                              </>
                            )}
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p
                  className="text-gray-500 italic bg-white p-4 rounded-lg shadow"
                  data-oid="jbi62cq"
                >
                  No upcoming events found.
                </p>
              )}
            </section>

            {/* Past Events Section */}
            <section data-oid="22krfy4">
              <h2
                className="text-2xl font-semibold mb-4 text-gray-700"
                data-oid="aykw71e"
              >
                Past Events
              </h2>
              {pastEvents.length > 0 ? (
                <div
                  className="bg-white rounded-lg shadow overflow-hidden"
                  data-oid="q3qidgl"
                >
                  <ul className="divide-y divide-gray-200" data-oid="g.l5xua">
                    {pastEvents.map((event) => (
                      <li
                        key={event.id}
                        className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-gray-50 opacity-70"
                        data-oid="1i2k_gd"
                      >
                        <div
                          className="flex-grow mb-2 md:mb-0 md:mr-4"
                          data-oid="8hevy54"
                        >
                          <span
                            className="font-semibold text-lg text-gray-600"
                            data-oid="c9tjrv."
                          >
                            {event.title}
                          </span>
                          <p
                            className="text-sm text-gray-500"
                            data-oid="0m1aad:"
                          >
                            {formatDate(event.date)}{" "}
                            {event.time ? `at ${event.time}` : ""}
                          </p>
                        </div>
                        <div
                          className="flex-shrink-0 flex space-x-2"
                          data-oid="71.dbno"
                        >
                          <button
                            onClick={() => handleEdit(event.id)}
                            className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            data-oid="wd9l7aw"
                          >
                            <Edit
                              size={14}
                              className="mr-1"
                              data-oid="7oxkg-1"
                            />{" "}
                            View/Edit
                          </button>
                          <button
                            onClick={() => handleDelete(event.id)}
                            disabled={deletingId === event.id}
                            className={`inline-flex items-center px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${deletingId === event.id ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"}`}
                            data-oid="5la-b7a"
                          >
                            {deletingId === event.id ? (
                              <>
                                <Loader2
                                  size={14}
                                  className="mr-1 animate-spin"
                                  data-oid="r_h2hrh"
                                />{" "}
                                Deleting...
                              </>
                            ) : (
                              <>
                                <Trash2
                                  size={14}
                                  className="mr-1"
                                  data-oid="nfdw_3:"
                                />{" "}
                                Delete
                              </>
                            )}
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p
                  className="text-gray-500 italic bg-white p-4 rounded-lg shadow"
                  data-oid="jr0s8y5"
                >
                  No past events found.
                </p>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
