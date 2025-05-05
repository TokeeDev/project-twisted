// src/components/events/FeaturedEvent.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram } from "lucide-react";

// Define expected props for event data
interface FeaturedEventProps {
  event?: {
    title: string;
    dateTime: string;
    djs: string;
    specials: string;
    imageUrl: string;
    instagramHandle: string;
    instagramLink: string;
  };
}

// Default event data
const defaultEvent = {
  title: "Synthwave Saturdays",
  dateTime: "Every Saturday | 9 PM - 2 AM",
  djs: "DJ Neon & Vector Hold",
  specials: "$5 Cyber Sunrise Cocktails",
  imageUrl: "/images/events/synthwave-poster.jpg", // Update with your actual image path
  instagramHandle: "@twistedcantina",
  instagramLink: "https://instagram.com/twistedcantina", // Update with your actual Instagram link
};

const FeaturedEvent: React.FC<FeaturedEventProps> = ({
  event = defaultEvent,
}) => {
  return (
    <section
      className="py-16 md:py-1 px-4 bg-twisted-darker text-white"
      data-oid="tak3wdf"
    >
      <div className="container mx-auto" data-oid="757tg73">
        {/* Featured heading with neon green styling */}

        {/* Main content container */}

        <h2
          className="text-5xl md:text-6xl font-bold text-twisted-neon text-right mb-12 md:mb-16"
          data-oid="gvmknj3"
          key="olk-ICVP"
        >
          Featured
        </h2>
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16"
          data-oid="knppah6"
        >
          {/* Phone-shaped image container - Left side */}
          <div
            className="w-full md:w-1/2 lg:w-2/5 flex justify-center"
            data-oid="::how4b"
          >
            <div
              className="relative w-full max-w-[280px] aspect-[9/16] rounded-[32px] border-2 border-twisted-neon overflow-hidden"
              data-oid="p-3n4t0"
            >
              {/* Time display overlay */}
              <div
                className="absolute top-6 left-0 right-0 z-10 text-center text-white text-xl font-medium"
                data-oid="vakanm."
              >
                9:16
              </div>

              {/* Image placeholder text - will be replaced by actual image */}
              <div
                className="absolute inset-0 flex items-center justify-center text-white/70 text-lg"
                data-oid="f53g05w"
              >
                image
              </div>

              <Image
                src={event.imageUrl}
                alt={`${event.title} Event`}
                fill
                sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 33vw"
                className="object-cover"
                priority
                data-oid="grv1s1j"
              />
            </div>
          </div>

          {/* Event details - Right side */}
          <div
            className="w-full md:w-1/2 lg:w-3/5 space-y-4 md:space-y-6 normal-case"
            data-oid="ivwz-i2"
          >
            {/* Title */}
            <h3
              className="text-3xl md:text-4xl font-bold text-twisted-neon"
              data-oid="tvx_ygx"
            >
              {event.title}
            </h3>

            {/* Date and Time */}
            <p className="text-xl md:text-2xl text-white" data-oid="fdsq-dx">
              {event.dateTime}
            </p>

            {/* DJs */}
            <p className="text-lg md:text-xl text-white/80" data-oid="atdvcat">
              {event.djs}
            </p>

            {/* Specials */}
            <p className="text-lg md:text-xl text-white/80" data-oid="c3ey93i">
              {event.specials}
            </p>

            {/* View Event button */}
            <div className="pt-4" data-oid="dfm:-w.">
              <Link
                href="/events"
                className="inline-block px-6 py-3 border-2 border-twisted-neon text-twisted-neon font-medium rounded-md hover:bg-twisted-neon/10 transition-colors"
                data-oid="p9g8i_j"
              >
                View Event
              </Link>
            </div>

            {/* Instagram handle */}
            <div className="pt-2" data-oid="wpxx97_">
              <Link
                href={event.instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white hover:text-twisted-neon transition-colors"
                data-oid="jnt.rwk"
              >
                <Instagram size={20} data-oid="3fmtipk" />
                <span data-oid="ifp7ym9">{event.instagramHandle}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default FeaturedEvent;
