"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation"; // For accessing route params and navigation
import { Loader2, AlertTriangle, Save, Trash2, ArrowLeft } from "lucide-react"; // Icons

// Define the structure of an event object for the form
// This should align with what the GET /api/events/[id] returns
// and what PUT /api/events/[id] expects (partially)
interface EventFormData {
  id: string;
  title: string;
  date: string; // Store as YYYY-MM-DD for input[type="date"]
  time: string; // Store as HH:MM for input[type="time"]
  djs: string[];
  specials: string[];
  imageUrl: string;
  instagram?: string;
  website?: string;
  address?: string;
}

// Default empty state for the form
const initialEventFormData: EventFormData = {
  id: "",
  title: "",
  date: "", // YYYY-MM-DD
  time: "", // HH:MM
  djs: [],
  specials: [],
  imageUrl: "",
  instagram: "",
  website: "",
  address: "",
};

const EditEventPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const eventId = params?.id as string | undefined;

  const [eventData, setEventData] = useState<EventFormData>(initialEventFormData);
  const [isLoading, setIsLoading] = useState(true); // For initial data load
  const [isSubmitting, setIsSubmitting] = useState(false); // For form submission
  const [isDeleting, setIsDeleting] = useState(false); // For deletion
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Helper to format ISO date string to YYYY-MM-DD for date input
  const formatDateForInput = (isoDateString: string | undefined | null): string => {
    if (!isoDateString) return "";
    try {
      return new Date(isoDateString).toISOString().split("T")[0];
    } catch {
      return ""; // Handle invalid date string gracefully
    }
  };

  // Helper to format ISO date string to HH:MM for time input
  const formatTimeForInput = (isoDateString: string | undefined | null, timeString: string | undefined | null): string => {
    if (timeString && /^\d{2}:\d{2}$/.test(timeString)) { // If explicit HH:MM time string is present
        return timeString;
    }
    if (!isoDateString) return "";
    try {
      const dateObj = new Date(isoDateString);
      const hours = dateObj.getHours().toString().padStart(2, "0");
      const minutes = dateObj.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    } catch {
      return "";
    }
  };


  // Fetch event data on component mount or when eventId changes
  useEffect(() => {
    if (eventId) {
      setIsLoading(true);
      setError(null);
      setSuccessMessage(null);

      const fetchEvent = async () => {
        try {
          const response = await fetch(`/api/events/${eventId}`);
          if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error || `Failed to fetch event: ${response.statusText}`);
          }
          const data = await response.json();
          
          setEventData({
            id: data.id,
            title: data.title || "",
            date: formatDateForInput(data.date), // API returns full ISO string
            time: data.time || formatTimeForInput(data.date, data.time), // API might return time string or it's part of date
            djs: Array.isArray(data.djs) ? data.djs : [],
            specials: Array.isArray(data.specials) ? data.specials : [],
            imageUrl: data.imageUrl || "",
            instagram: data.instagram || "",
            website: data.website || "",
            address: data.address || "",
          });
        } catch (err: any) {
          console.error("Error fetching event:", err);
          setError(err.message || "An unknown error occurred while fetching event data.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchEvent();
    } else {
      // Should not happen if route is matched correctly, but good for safety
      setError("Event ID is missing.");
      setIsLoading(false);
    }
  }, [eventId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "djs" | "specials"
  ) => {
    const { value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [field]: value.split(",").map((item) => item.trim()).filter(item => item), // Split by comma, trim, remove empty
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!eventId) return;

    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    // Basic validation
    if (!eventData.title || !eventData.date || !eventData.imageUrl) {
        setError("Title, Date, and Image URL are required.");
        setIsSubmitting(false);
        return;
    }
    if (eventData.time && !/^\d{2}:\d{2}$/.test(eventData.time)) {
        setError("Time must be in HH:MM format if provided.");
        setIsSubmitting(false);
        return;
    }


    // Prepare data for PUT request (API expects arrays for djs/specials)
    const payload = {
      title: eventData.title,
      date: eventData.date, // YYYY-MM-DD
      time: eventData.time || null, // HH:MM or null
      djs: eventData.djs,
      specials: eventData.specials,
      imageUrl: eventData.imageUrl,
      instagram: eventData.instagram || null,
      website: eventData.website || null,
      address: eventData.address || null,
    };

    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || `Failed to update event: ${response.statusText}`);
      }
      const updatedEvent = await response.json();
      setSuccessMessage("Event updated successfully!");
      // Optionally, update form data with response if it contains more processed data
      setEventData({
        id: updatedEvent.id,
        title: updatedEvent.title || "",
        date: formatDateForInput(updatedEvent.date),
        time: updatedEvent.time || formatTimeForInput(updatedEvent.date, updatedEvent.time),
        djs: Array.isArray(updatedEvent.djs) ? updatedEvent.djs : [],
        specials: Array.isArray(updatedEvent.specials) ? updatedEvent.specials : [],
        imageUrl: updatedEvent.imageUrl || "",
        instagram: updatedEvent.instagram || "",
        website: updatedEvent.website || "",
        address: updatedEvent.address || "",
      });
      // router.push('/admin/events'); // Or wherever you list events
    } catch (err: any) {
      console.error("Error updating event:", err);
      setError(err.message || "An unknown error occurred while updating the event.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!eventId || !window.confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
        return;
    }

    setIsDeleting(true);
    setError(null);
    setSuccessMessage(null);

    try {
        const response = await fetch(`/api/events/${eventId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error || `Failed to delete event: ${response.statusText}`);
        }
        setSuccessMessage("Event deleted successfully!");
        // Redirect to events list or dashboard
        router.push("/"); // Or your events list page e.g. /admin/events
    } catch (err: any) {
        console.error("Error deleting event:", err);
        setError(err.message || "An unknown error occurred while deleting the event.");
    } finally {
        setIsDeleting(false);
    }
  };


  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
        <Loader2 className="animate-spin h-12 w-12 text-neon-green mb-4" />
        <p className="text-xl">Loading event details...</p>
      </div>
    );
  }

  // If eventId was initially undefined or fetch failed critically before setting eventData.id
  if (!eventData.id && error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
        <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
        <p className="text-xl text-red-400">Error loading event</p>
        <p className="text-gray-400 mt-1">{error}</p>
        <button
            onClick={() => router.back()}
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-neon-green hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon-green focus:ring-offset-gray-900"
        >
            <ArrowLeft size={18} className="mr-2" />
            Go Back
        </button>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-2xl mx-auto bg-gray-800 shadow-xl rounded-lg p-6 md:p-8">
        <button
            onClick={() => router.back()}
            className="mb-6 inline-flex items-center text-neon-green hover:text-opacity-80 transition-colors"
        >
            <ArrowLeft size={20} className="mr-2" />
            Back
        </button>
        <h1 className="text-3xl md:text-4xl font-heading text-neon-green mb-6">
          Edit Event: <span className="text-white">{eventData.title || "Loading..."}</span>
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-700 bg-opacity-50 text-red-300 border border-red-500 rounded-md flex items-center">
            <AlertTriangle size={20} className="mr-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-700 bg-opacity-50 text-green-300 border border-green-500 rounded-md flex items-center">
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={eventData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-neon-green focus:border-neon-green text-white placeholder-gray-500"
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">
                Date <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                name="date"
                id="date"
                value={eventData.date} // Expects YYYY-MM-DD
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-neon-green focus:border-neon-green text-white"
                style={{ colorScheme: 'dark' }} // For better date picker styling in dark mode
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-300 mb-1">
                Time (HH:MM)
              </label>
              <input
                type="time" // Use time input for better UX
                name="time"
                id="time"
                value={eventData.time} // Expects HH:MM
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-neon-green focus:border-neon-green text-white"
                style={{ colorScheme: 'dark' }}
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300 mb-1">
              Image URL <span className="text-red-400">*</span>
            </label>
            <input
              type="url"
              name="imageUrl"
              id="imageUrl"
              value={eventData.imageUrl}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-neon-green focus:border-neon-green text-white placeholder-gray-500"
            />
          </div>
          
          {/* DJs */}
          <div>
            <label htmlFor="djs" className="block text-sm font-medium text-gray-300 mb-1">
              DJs (comma-separated)
            </label>
            <input
              type="text"
              name="djs"
              id="djs"
              value={eventData.djs.join(", ")}
              onChange={(e) => handleArrayChange(e, "djs")}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-neon-green focus:border-neon-green text-white placeholder-gray-500"
            />
          </div>

          {/* Specials */}
          <div>
            <label htmlFor="specials" className="block text-sm font-medium text-gray-300 mb-1">
              Specials (comma-separated)
            </label>
            <input
              type="text"
              name="specials"
              id="specials"
              value={eventData.specials.join(", ")}
              onChange={(e) => handleArrayChange(e, "specials")}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-neon-green focus:border-neon-green text-white placeholder-gray-500"
            />
          </div>

          {/* Optional Fields */}
          <div>
            <label htmlFor="instagram" className="block text-sm font-medium text-gray-300 mb-1">
              Instagram Handle (e.g., @username)
            </label>
            <input
              type="text"
              name="instagram"
              id="instagram"
              value={eventData.instagram}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-neon-green focus:border-neon-green text-white placeholder-gray-500"
            />
          </div>
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-1">
              Website URL
            </label>
            <input
              type="url"
              name="website"
              id="website"
              value={eventData.website}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-neon-green focus:border-neon-green text-white placeholder-gray-500"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">
              Address
            </label>
            <textarea
              name="address"
              id="address"
              rows={3}
              value={eventData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-neon-green focus:border-neon-green text-white placeholder-gray-500"
            />
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting || isDeleting}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-black bg-neon-green hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon-green focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <Loader2 size={20} className="animate-spin mr-2" />
              ) : (
                <Save size={20} className="mr-2" />
              )}
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isSubmitting || isDeleting || !eventData.id}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-red-600 text-base font-medium rounded-md shadow-sm text-red-400 hover:bg-red-700 hover:text-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? (
                <Loader2 size={20} className="animate-spin mr-2" />
              ) : (
                <Trash2 size={20} className="mr-2" />
              )}
              Delete Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventPage;