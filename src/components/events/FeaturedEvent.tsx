"use client"; // Add this directive for client-side hooks

// -----------------------------------------------------------------------------
// IMPORTS
// -----------------------------------------------------------------------------

import React, { useState, useEffect, useRef } from "react"; // Import React hooks for state and lifecycle management
import Image from "next/image"; // Import Next.js Image component for optimized image handling
import type { Event as PrismaEvent } from "@prisma/client"; // Import Prisma's Event type (though custom 'Event' interface is used below)
import Link from "next/link"; // Import Next.js Link component for client-side navigation
import {
  Calendar, // Icon for event date/time
  User,     // Icon for DJs
  Star,     // Icon for specials
  Music,    // Icon for event title
  Loader2,  // Icon for loading states
  AlertTriangle, // Icon for error states
} from "lucide-react"; // Import icons for UI elements

// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

/**
 * @interface Event
 * @description Defines the structure of an event object as expected from the API response.
 * This mirrors the data structure fetched from `/api/events`.
 */
interface Event {
  id: string; // Unique identifier for the event
  title: string; // Title of the event
  date: string; // Date of the event (Prisma DateTime, serialized to ISO string, e.g., "2024-05-09T21:00:00.000Z")
  time: string | null; // Optional time of the event (e.g., "HH:MM" format)
  djs: string[]; // Array of DJ names performing at the event
  specials: string[]; // Array of special offers or features for the event
  imageUrl: string | null; // URL for the event's poster image
  website?: string | null; // Optional website URL for the event
  instagram?: string | null; // Optional Instagram handle or link (Added to match potential API response fields)
  address?: string | null; // Optional address of the event venue (Added to match potential API response fields)
  createdAt: string; // Timestamp of when the event was created
  updatedAt: string; // Timestamp of when the event was last updated
}

/**
 * @interface DisplayEvent
 * @description Defines the structure for the data that will be directly used for rendering the featured event.
 * This is a transformed/formatted version of the `Event` data.
 */
interface DisplayEvent {
  title: string; // Formatted title for display
  dateTime: string; // Formatted date and time string for display
  djs: string[]; // Array of DJ names for display
  specials: string[]; // Array of specials for display
  imageUrl: string; // URL for the event image (could be a placeholder)
  instagramHandle: string; // Instagram handle for display
  instagramLink: string; // Full Instagram link
}

// -----------------------------------------------------------------------------
// CONSTANTS
// -----------------------------------------------------------------------------

/**
 * @const defaultDisplayEvent
 * @description Default data to be displayed when no upcoming event is found or if there's an error.
 * Acts as a placeholder.
 */
const defaultDisplayEvent: DisplayEvent = {
  title: "Check Back Soon!",
  dateTime: "No upcoming events scheduled.",
  djs: ["TBA"],
  specials: ["Follow us for updates!"],
  imageUrl: "/event-placeholder.png", // Path to a placeholder image
  instagramHandle: "@TwistedCantina",
  instagramLink: "https://instagram.com/TwistedCantina",
};

/**
 * @const POLLING_INTERVAL_MS
 * @description Interval in milliseconds for periodically re-fetching event data.
 * Currently set to 5 minutes (5 * 60 * 1000).
 */
const POLLING_INTERVAL_MS = 5 * 60 * 1000;

// -----------------------------------------------------------------------------
// HELPER FUNCTIONS
// -----------------------------------------------------------------------------

/**
 * @function getEventDateTime
 * @description Combines an event's date string and an optional time string to produce a definitive Date object.
 * If `eventTimeStr` is provided and valid (HH:MM), it overrides the time part of `eventDateStr`.
 * Otherwise, `eventDateStr` (which can be a full ISO timestamp or YYYY-MM-DD) is used.
 * @param {string} eventDateStr - The date string from the event (e.g., "2024-05-09T21:00:00.000Z" or "2024-05-09").
 * @param {string | null} eventTimeStr - The optional time string (e.g., "21:00" or "09:30").
 * @returns {Date} A Date object representing the event's start date and time.
 */
function getEventDateTime(eventDateStr: string, eventTimeStr: string | null): Date {
  // Start with the date from eventDateStr. This gives us year, month, day.
  // It might also give us time, but we'll override H:M if eventTimeStr is present.
  const baseDate = new Date(eventDateStr);

  if (eventTimeStr) {
    // Regex to match HH:MM format (1 or 2 digits for hour, 2 digits for minute)
    const timeParts = eventTimeStr.match(/^(\d{1,2}):(\d{1,2})$/);
    if (timeParts) {
      const hours = parseInt(timeParts[1], 10);
      const minutes = parseInt(timeParts[2], 10);

      // Validate parsed hours and minutes
      if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
        // Create a new Date object setting the year, month, day from baseDate,
        // and hours, minutes from eventTimeStr. Seconds and ms will be 0.
        return new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate(), hours, minutes);
      }
    }
    // If eventTimeStr is present but invalid (e.g., "25:00" or "abc"), log a warning.
    console.warn(`Invalid time format in event.time: "${eventTimeStr}". Using date from event.date as is.`);
  }
  
  // If eventTimeStr is null, empty, or invalid, return the date parsed from eventDateStr.
  // This date might include time if eventDateStr was a full ISO timestamp, or be midnight if it was YYYY-MM-DD.
  return baseDate;
}

// -----------------------------------------------------------------------------
// REACT COMPONENT: FeaturedEvent
// -----------------------------------------------------------------------------

/**
 * @component FeaturedEvent
 * @description A React functional component that fetches and displays the soonest upcoming event.
 * It includes loading and error states, and polls for updates.
 */
const FeaturedEvent: React.FC = () => {
  // --- STATE VARIABLES ---
  const [featuredEvent, setFeaturedEvent] = useState<DisplayEvent | null>(null); // Holds the event data to be displayed
  const [isLoading, setIsLoading] = useState(true); // True during the initial data load
  const [isPolling, setIsPolling] = useState(false); // True during background polling updates
  const [error, setError] = useState<string | null>(null); // Stores error messages, if any

  // --- REFS ---
  const isMounted = useRef(false); // Ref to track if the component is currently mounted, to prevent state updates on unmounted components

  // --- EFFECTS ---
  useEffect(() => {
    // Set isMounted to true when the component mounts
    isMounted.current = true;

    /**
     * @async
     * @function fetchAndSetFeaturedEvent
     * @description Fetches all events, determines the soonest upcoming one, formats it, and updates the state.
     * Handles loading states and errors.
     * @param {boolean} [isInitialLoad=false] - Flag to indicate if this is the first data fetch.
     */
    const fetchAndSetFeaturedEvent = async (isInitialLoad = false) => {
      // Prevent execution if the component has unmounted
      if (!isMounted.current) return;

      // Set appropriate loading state based on whether it's an initial load or a background poll
      if (isInitialLoad) {
        setIsLoading(true);
      } else {
        setIsPolling(true); // Indicate background polling activity
      }
      setError(null); // Clear any previous errors

      try {
        // Fetch all events from the API endpoint
        const response = await fetch("/api/events");
        if (!isMounted.current) return; // Check mount status again after an async operation

        // Handle non-successful HTTP responses
        if (!response.ok) {
          throw new Error(`Failed to fetch events: ${response.statusText} (Status: ${response.status})`);
        }

        // Parse the JSON response
        const events: Event[] = await response.json();
        if (!isMounted.current) return;

        // Process events if the array is not empty
        if (events && events.length > 0) {
          const now = new Date(); // Current date and time
          let soonestUpcomingEvent: Event | null = null; // To store the identified soonest event
          let soonestUpcomingEventTime = Infinity; // Initialize with a very large number for comparison

          // Iterate through all fetched events to find the soonest one in the future
          for (const event of events) {
            const eventDateTime = getEventDateTime(event.date, event.time); // Get the definitive start time for the event

            // Check if the event is in the future
            if (eventDateTime > now) {
              const timeDifference = eventDateTime.getTime() - now.getTime(); // Calculate time difference from now
              // If this event is sooner than the current 'soonestUpcomingEvent', update it
              if (timeDifference < soonestUpcomingEventTime) {
                soonestUpcomingEventTime = timeDifference;
                soonestUpcomingEvent = event;
              }
            }
          }

          // If an upcoming event was found, format it for display
          if (soonestUpcomingEvent) {
            const displayDateTime = getEventDateTime(soonestUpcomingEvent.date, soonestUpcomingEvent.time);
            setFeaturedEvent({
              title: soonestUpcomingEvent.title,
              dateTime: displayDateTime.toLocaleString("en-US", { // Format date and time for readability
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
                timeZone: "America/Chicago", // Ensure CST display
              }),
              djs: soonestUpcomingEvent.djs && soonestUpcomingEvent.djs.length > 0 ? soonestUpcomingEvent.djs : [], // Pass array directly
              specials: soonestUpcomingEvent.specials && soonestUpcomingEvent.specials.length > 0 ? soonestUpcomingEvent.specials : [], // Pass array directly
              imageUrl: soonestUpcomingEvent.imageUrl || defaultDisplayEvent.imageUrl, // Use event image or default
              // Assuming instagram handle might come from a field like 'instagram'
              // or use the default if not available per event.
              instagramHandle: soonestUpcomingEvent.instagram || defaultDisplayEvent.instagramHandle, 
              instagramLink: soonestUpcomingEvent.instagram 
                ? `https://instagram.com/${soonestUpcomingEvent.instagram.replace("@","")}` // Construct Instagram link
                : defaultDisplayEvent.instagramLink, // Or use default link
            });
          } else {
            // No upcoming events found, use default display data
            setFeaturedEvent(defaultDisplayEvent);
          }
        } else {
          // No events at all in the API response, use default display data
          setFeaturedEvent(defaultDisplayEvent);
        }
      } catch (err) {
        if (!isMounted.current) return; // Check mount status
        console.error("Error fetching featured event:", err);
        // Set error message, preferring `err.message` if `err` is an Error instance
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        setFeaturedEvent(defaultDisplayEvent); // Fallback to default display data on error
      } finally {
        if (!isMounted.current) return; // Check mount status
        // Reset loading states
        if (isInitialLoad) {
          setIsLoading(false);
        }
        setIsPolling(false); // Reset polling indicator
      }
    };

    // Perform the initial fetch when the component mounts
    fetchAndSetFeaturedEvent(true); // `isInitialLoad = true`

    // Set up an interval to periodically fetch and update the event data
    const intervalId = setInterval(() => fetchAndSetFeaturedEvent(false), POLLING_INTERVAL_MS); // `isInitialLoad = false` for subsequent polls

    // Cleanup function: runs when the component unmounts
    return () => {
      isMounted.current = false; // Mark component as unmounted
      clearInterval(intervalId); // Clear the polling interval to prevent memory leaks
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount and cleans up on unmount

  // --- DERIVED STATE ---
  // Determine the event data to display: either the fetched event or the default placeholder
  const eventToDisplay = featuredEvent || defaultDisplayEvent;

  // --- CONDITIONAL RENDERING: LOADING STATE ---
  // Show a full-page loader only on initial load and if no event data is yet available
  if (isLoading && !featuredEvent) {
    return (
      <section id="featured" className="py-16 px-6 bg-black text-white min-h-[650px] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center h-full text-neon-green">
          <Loader2 className="animate-spin h-16 w-16 mb-5" /> {/* Loading spinner icon */}
          <p className="text-2xl font-body font-semibold">Loading Upcoming Event...</p>
        </div>
      </section>
    );
  }

  // --- CONDITIONAL RENDERING: ERROR STATE ---
  // Show a full-page error message if an error occurred during the initial load and no event data is set
  // The `isLoading` check helps confirm it was an initial load error, as `isLoading` is true only then.
  if (error && isLoading && !featuredEvent) {
    return (
      <section id="featured" className="py-16 px-6 bg-black text-white min-h-[650px] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center h-full text-red-500">
          <AlertTriangle className="h-16 w-16 mb-5" /> {/* Error icon */}
          <p className="text-2xl font-body font-semibold">Error Loading Event</p>
          <p className="text-md text-gray-400 mt-1">({error})</p> {/* Display the error message */}
        </div>
      </section>
    );
  }

  // --- MAIN RENDER ---
  // Render the featured event display
  return (
    <section
      id="featured" // Section ID
      className="py-16 px-6 bg-black text-white min-h-[650px] flex items-center justify-center overflow-hidden" // Styling classes
      data-oid="z34fadb" // Data attribute (purpose specific to your setup)
    >
      <div className="container mx-auto h-full" data-oid="h7ki1-9">
        {/* Main content container for layout */}
        <div
          className="flex flex-col md:flex-row items-center md:items-stretch h-full gap-12 md:gap-20 lg:gap-24"
          data-oid="wieubl7"
        >
          {/* Image Container: Displays the event poster */}
          <div
            className="w-full md:w-5/12 order-2 md:order-1 flex justify-center items-center h-full" // Responsive ordering and sizing
            data-oid="ubdypvd"
          >
            <div
              className="relative h-full w-full max-w-sm aspect-[12/16] overflow-hidden rounded-xl shadow-neon-glow border-4 border-neon-green/70 bg-gray-900 transform hover:scale-105 transition-transform duration-300" // Styling for image frame and hover effect
              data-oid="8ffmbdg"
            >
              {/* Conditionally render Next/Image if a valid imageUrl exists and is not the placeholder */}
              {eventToDisplay.imageUrl &&
              eventToDisplay.imageUrl !== "/event-placeholder.png" ? (
                <Image
                  src={eventToDisplay.imageUrl}
                  alt={`${eventToDisplay.title} Poster`} // Alt text for accessibility
                  layout="fill" // Fill the parent container
                  objectFit="cover" // Cover the area, cropping if necessary
                  className="transition-opacity duration-300 ease-in-out" // Smooth opacity transition on load
                  priority // Prioritize loading for LCP (Largest Contentful Paint)
                  unoptimized={eventToDisplay.imageUrl.startsWith("http")} // Disable Next.js optimization for external URLs if they are not on a configured domain
                  data-oid="yiu96in"
                />
              ) : (
                // Fallback display if no image or only placeholder is available
                <div
                  className="flex h-full w-full items-center justify-center text-gray-400 font-semibold text-lg"
                  data-oid="-cw5ad2"
                >
                  <span data-oid="oygwpw0">Event Image</span>
                </div>
              )}
            </div>
          </div>

          {/* Details Container: Displays textual information about the event */}
          <div
            className="flex-1 order-1 md:order-2 text-center md:text-left flex flex-col justify-center h-full md:pl-6 lg:pl-10" // Responsive ordering and alignment
            data-oid=".44k7tr"
          >
            {/* Section Title */}
            <h2
              className="text-6xl md:text-7xl lg:text-8xl font-heading font-extrabold text-neon-green text-center md:text-start tracking-tight uppercase drop-shadow-lg mb-16" // Large, stylized heading
              data-oid="dgmyfx4"
            >
              Upcoming
            </h2>

            {/* Event Information Block */}
            <div
              className="flex flex-col gap-4 md:gap-5 items-center md:items-start" // Styling for event details list
              data-oid="uf2nfbf"
            >
              {/* Event Title */}
              <h4
                className="flex items-center text-4xl md:text-5xl font-heading font-semibold text-white mb-2 text-center md:text-left"
                data-oid="0i187qb"
              >
                <Music
                  className="mr-3 text-neon-green" // Icon styling
                  size={36} // Icon size
                  data-oid="y1dtm6."
                />
                {eventToDisplay.title}
              </h4>

              {/* Event Date and Time */}
              <p
                className="flex items-center text-2xl md:text-3xl text-gray-200 font-body mb-2"
                data-oid="w9cazv_"
              >
                <Calendar
                  className="mr-3 text-neon-green"
                  size={30}
                  data-oid="373.x0g"
                />
                {eventToDisplay.dateTime}
              </p>

              {/* Event DJs */}
              {eventToDisplay.djs && eventToDisplay.djs.length > 0 && (
                <div className="flex items-start text-xl md:text-2xl text-gray-300 font-body mb-2" data-oid="t8uw3qq">
                  <User
                    className="mr-3 mt-1 text-neon-green flex-shrink-0"
                    size={28}
                    data-oid=":610exr"
                  />
                  <div>
                    <span className="font-semibold">DJs:</span>
                    <ul className="list-disc list-inside ml-1 font-medium" data-oid="w1vpy7x">
                      {eventToDisplay.djs.map((dj, index) => (
                        <li key={`featured-dj-${index}`}>{dj}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Event Specials */}
              {eventToDisplay.specials && eventToDisplay.specials.length > 0 && (
                <div className="flex items-start text-xl md:text-2xl text-gray-300 font-body mb-6" data-oid="g.fdhy.">
                  <Star
                    className="mr-3 mt-1 text-neon-green flex-shrink-0"
                    size={28}
                    data-oid="1d6eo1b"
                  />
                  <div>
                    <span className="font-semibold">Specials:</span>
                    <ul className="list-disc list-inside ml-1 font-medium" data-oid="9qt60zr">
                      {eventToDisplay.specials.map((special, index) => (
                        <li key={`featured-special-${index}`}>{special}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Instagram Link (conditionally rendered) */}
              {eventToDisplay.instagramLink &&
                eventToDisplay.instagramHandle && (
                  <Link
                    href={eventToDisplay.instagramLink}
                    target="_blank" // Open in new tab
                    rel="noopener noreferrer" // Security best practice for target="_blank"
                    className="inline-block mt-4 text-neon-green text-xl md:text-2xl font-body font-semibold hover:underline hover:brightness-125 transition-all duration-200 self-center md:self-start" // Styling for the link
                    data-oid="xj.ux23"
                  >
                    Follow Us: {eventToDisplay.instagramHandle}
                  </Link>
                )}
            </div>

            {/* Subtle Polling Indicator: Shows a small loader when background polling is active */}
            {isPolling && <Loader2 className="animate-spin h-6 w-6 text-neon-green/50 absolute top-4 right-4" />}
          </div>
        </div>
      </div>

      {/* Global JSX Styles: Specific styles for this component */}
      <style jsx global data-oid="yzgj6nk">{`
        .text-neon-green {
          color: #39ff14; /* Neon green color */
          text-shadow: /* Multi-layer text shadow for glow effect */
            0 0 5px #39ff14,
            0 0 10px #39ff14,
            0 0 15px rgba(57, 255, 20, 0.5);
        }
        .border-neon-green\\/70 { /* Escaped slash for Tailwind JIT compatibility if needed, or direct CSS class */
          border-color: rgba(57, 255, 20, 0.7); /* Neon green border with opacity */
          box-shadow: 0 0 15px rgba(57, 255, 20, 0.4); /* Box shadow for glow effect */
        }
        .shadow-neon-glow { /* Custom shadow for a softer, wider glow */
          box-shadow:
            0 0 8px rgba(57, 255, 20, 0.3),
            0 0 20px rgba(57, 255, 20, 0.2),
            0 0 30px rgba(57, 255, 20, 0.1);
        }
        .font-heading { /* Custom font for headings */
          font-family: "Orbitron", sans-serif; /* Example: Orbitron font */
        }
      `}</style>
    </section>
  );
};

// -----------------------------------------------------------------------------
// EXPORT
// -----------------------------------------------------------------------------

export default FeaturedEvent; // Export the component for use in other parts of the application