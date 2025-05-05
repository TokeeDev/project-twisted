// src/components/FeaturedEvent.tsx
import React from "react";
import Image from "next/image"; // Using Next.js Image component
import Link from "next/link";

// Define expected props if you plan to pass event data dynamically
interface FeaturedEventProps {
  event?: {
    // Example structure - adapt as needed
    title: string;
    dateTime: string;
    djs: string;
    specials: string;
    imageUrl: string;
    instagramHandle: string;
    instagramLink: string;
  };
}

// Default data for placeholder - replace with actual fetched/static data
const defaultEvent = {
  title: "Synthwave Saturdays",
  dateTime: "Every Saturday | 9 PM - 2 AM",
  djs: "DJ Neon & Vector Hold",
  specials: "$5 Cyber Sunrise Cocktails",
  imageUrl: "/path/to/your-event-poster-9x16.jpg", // *** IMPORTANT: Update this path ***
  instagramHandle: "@TwistedCantina",
  instagramLink: "https://instagram.com/TwistedCantina", // *** IMPORTANT: Update this link ***
};

const FeaturedEvent: React.FC<FeaturedEventProps> = ({
  event = defaultEvent,
}) => {
  return (
    // Section using black background to blend smoothly after the hero. Increased padding.
    <section
      id="featured"
      className="py-20 md:py-28 px-4 bg-black text-white"
      data-oid=":5u-.:q"
    >
      {" "}
      {/* Changed bg-brand-black to bg-black */}
      <div className="container mx-auto" data-oid="38s7hxf">
        {/* Centered "Featured" Title - Larger and using a neon color (match Hero's text-twisted-neon if defined) */}

        {/* Main content container: Uses Flexbox for side-by-side layout on medium screens and up */}
        <div
          className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16 lg:gap-20"
          data-oid="aj708_w"
        >
          {/* Image Container (Left on Desktop) */}
          {/* Larger width allocation (40% to 50%). Responsive max-width. order-2 ensures it's below text on mobile */}

          <div
            className="flex-1 order-1 md:order-2 text-center md:text-left md:pl-4 lg:pl-6"
            data-oid="q0oxg2t"
            key="olk-LzLP"
          >
            {/* Event Title - Significantly larger */}
            <h3
              className="text-4xl md:text-5xl lg:text-6xl font-heading text-white mb-5 md:mb-6"
              data-oid="h_9nngo"
            >
              {event.title}
            </h3>
            {/* Event Details - Larger font sizes */}
            <p
              className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-body mb-4 md:mb-5"
              data-oid="3ont01u"
            >
              {event.dateTime}
            </p>
            <p
              className="text-lg md:text-xl lg:text-2xl text-gray-400 font-body mb-4 md:mb-5"
              data-oid="6rn_b7l"
            >
              DJs: {event.djs}
            </p>
            <p
              className="text-lg md:text-xl lg:text-2xl text-gray-400 font-body mb-6 md:mb-8"
              data-oid="bl7bk6e"
            >
              Specials: {event.specials}
            </p>
            {/* Instagram Link - Larger and styled */}
            <Link
              href={event.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-neon-green text-lg md:text-xl lg:text-2xl font-body hover:underline hover:animate-buzz transition-all duration-150" // Assuming animate-buzz is defined
              data-oid="azq8jb_"
            >
              {event.instagramHandle}
            </Link>
          </div>
          <div
            className="w-full md:w-2/5 lg:w-[45%] order-2 md:order-1 flex justify-center md:justify-start"
            data-oid="2tt35tj"
          >
            {/* Relative container needed for Image with layout="fill" */}
            <div
              className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl aspect-[9/16] overflow-hidden rounded-lg shadow-2xl border-2 border-neon-green/60"
              data-oid="vx3:a2i"
            >
              {" "}
              {/* Added border like Hero video */}
              <Image
                src={event.imageUrl}
                alt={`${event.title} Poster`}
                layout="fill" // Fill the container
                objectFit="cover" // Cover the area without stretching
                className="transition-transform duration-300 ease-in-out hover:scale-105 top-auto right-auto bottom-auto left-auto absolute" // Optional subtle zoom on hover
                priority // Consider adding priority if this image is often above the fold after scroll
                data-oid="qpijem8"
              />
            </div>
          </div>

          {/* Details Container (Right on Desktop) */}
          {/* flex-1 takes remaining space. order-1 ensures it's above image on mobile. Increased padding for gap. */}
        </div>
        <h2
          className="text-5xl md:text-6xl lg:text-7xl font-heading text-neon-green text-center mb-16 md:mb-20"
          data-oid="dv6s8j6"
          key="olk-dh-D"
        >
          {" "}
          {/* Assuming text-neon-green is defined */}
          Featured
        </h2>
      </div>
      {/* Ensure necessary styles are defined in tailwind.config or globals.css */}
      {/* Example style block if needed, but prefer defining in config/globals */}
      <style jsx global data-oid="jfd:1.r">{`
        .text-neon-green {
          color: #2cff05;
        } /* Match this to your theme */
        .border-neon-green\\/60 {
          border-color: rgba(44, 255, 5, 0.6);
        }
        .font-heading {
          font-family: /* Your heading font */;
        } /* E.g., 'PixelFontName1', sans-serif */
        .font-body {
          font-family: /* Your body font */;
        } /* E.g., 'PixelFontName2', sans-serif */

        /* Ensure 'animate-buzz' corresponds to a keyframe animation in tailwind.config.js */
        /* Example (should be in tailwind.config.js ideally):
        theme: {
          extend: {
            keyframes: {
              buzz: {
                '0%, 100%': { transform: 'translate(0, 0)' },
                '25%': { transform: 'translate(-1px, 1px)' },
                '50%': { transform: 'translate(1px, -1px)' },
                '75%': { transform: 'translate(1px, 1px)' },
              },
            },
            animation: {
              buzz: 'buzz 0.1s infinite linear',
            },
          },
        },
        */
        .hover\\:animate-buzz:hover {
          animation: buzz 0.1s infinite linear; /* Direct application if needed */
        }
      `}</style>
    </section>
  );
};
export default FeaturedEvent;
