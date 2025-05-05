// src/components/events/FeaturedEvent.tsx
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram } from "lucide-react";

// Define expected props for event data to match your database schema
interface EventType {
  id: string;
  title: string;
  date: string;
  time: string;
  imageUrl: string;
  djs: string | null;
  specials: string | null;
  featured: boolean;
}

interface FeaturedEventProps {
  preloadedEvent?: EventType;
}

const defaultInstagram = {
  handle: "@twistedcantina",
  link: "https://instagram.com/twistedcantina",
};

const FeaturedEvent: React.FC<FeaturedEventProps> = ({ preloadedEvent }) => {
  const [event, setEvent] = useState<EventType | null>(preloadedEvent || null);
  const [loading, setLoading] = useState(!preloadedEvent);

  useEffect(() => {
    // If no preloaded event, fetch the featured event
    if (!preloadedEvent) {
      const fetchFeaturedEvent = async () => {
        try {
          const response = await fetch("/api/events/featured");
          if (response.ok) {
            const data = await response.json();
            setEvent(data);
          }
        } catch (error) {
          console.error("Error fetching featured event:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchFeaturedEvent();
    }
  }, [preloadedEvent]);

  if (loading) {
    return (
      <div className="py-16 text-center text-white" data-oid="y:7cvn6">
        Loading featured event...
      </div>
    );
  }

  if (!event) {
    return null; // Or show a placeholder/default state
  }

  // Format the date
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <section
      className="py-16 md:py-1 px-4 bg-twisted-darker text-white"
      data-oid="vom:r2s"
    >
      <div className="container mx-auto" data-oid="x7sx-1v">
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16"
          data-oid="r3m122t"
        >
          {/* Phone-shaped image container - Left side */}
          <div
            className="w-full md:w-1/2 lg:w-2/5 flex justify-center rounded-[1px] mt-[50px] mb-[50px]"
            data-oid="1ig:2s6"
          >
            <div
              className="relative w-full max-w-[280px] aspect-[9/16] rounded-[32px] border-2 border-twisted-neon overflow-hidden"
              data-oid="t92xvbn"
            >
              {/* Time display overlay */}
              <div
                className="absolute top-6 left-0 right-0 z-10 text-center text-white text-xl font-medium"
                data-oid=".4pyhgr"
              >
                9:16
              </div>

              <Image
                src={event.imageUrl}
                alt={`${event.title} Event`}
                fill
                sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 33vw"
                className="object-cover fixed top-auto right-auto bottom-auto left-auto flex mt-[5px]"
                priority
                data-oid=":2m82nh"
              />
            </div>
          </div>

          {/* Event details - Right side */}
          <div
            className="w-full md:w-1/2 lg:w-3/5 space-y-4 md:space-y-6 normal-case flex justify-start flex-col items-center"
            data-oid="d-u34j1"
          >
            {/* Title */}
            <h3
              className="text-3xl md:text-4xl font-bold text-twisted-neon"
              data-oid="i6vujmp"
            >
              {event.title}
            </h3>

            {/* Date and Time */}
            <p className="text-xl md:text-2xl text-white" data-oid="auxq5pk">
              {formattedDate} | {event.time}
            </p>

            {/* DJs */}
            {event.djs && (
              <p
                className="text-lg md:text-xl text-white/80"
                data-oid="2596xp4"
              >
                {event.djs}
              </p>
            )}

            {/* Specials */}
            {event.specials && (
              <p
                className="text-lg md:text-xl text-white/80"
                data-oid="2427npn"
              >
                {event.specials}
              </p>
            )}

            {/* View Event button */}
            <div className="pt-4" data-oid="c:.7e8k">
              <Link
                href="/events"
                className="inline-block px-6 py-3 border-2 border-twisted-neon text-twisted-neon font-medium rounded-md hover:bg-twisted-neon/10 transition-colors"
                data-oid="zowx0nh"
              >
                View Event
              </Link>
            </div>

            {/* Instagram handle */}
            <div className="pt-2" data-oid=".jjhg0v">
              <Link
                href={defaultInstagram.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white hover:text-twisted-neon transition-colors"
                data-oid="4x4v3ws"
              >
                <Instagram size={20} data-oid="5eu39xz" />
                <span data-oid="tzcymtd">{defaultInstagram.handle}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvent;
