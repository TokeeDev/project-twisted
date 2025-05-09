"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link"; // Import Link for navigation
import Button from "./Button"; // Import the new Button component

// Star SVG component for ratings
const StarIcon = ({ filled, className }: { filled: boolean; className?: string }) => (
  <svg
    className={`w-5 h-5 ${filled ? "text-yellow-400" : "text-gray-600"} ${className || ""}`}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  </svg>
);

// Instagram Icon SVG Component
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    className={`w-5 h-5 ${className || "text-pink-500"}`}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
  </svg>
);


const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          heroRef.current?.classList.add("animate-in");
        }
      },
      {
        threshold: 0.1,
      },
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleDesktopPlayClick = () => {
    if (!videoPlaying) {
      setVideoPlaying(true);
      setTimeout(() => {
        videoRef.current?.play();
      }, 50);
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden rounded-b-lg"
      style={{
        backgroundImage: "url('/hero-section.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      <div className="relative z-20 flex flex-col md:flex-row w-full max-w-6xl mx-auto px-4 items-center justify-between gap-8 md:gap-16">
        <div className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/2">
          <h1
            className="text-6xl md:text-7xl lg:text-8xl font-bold mb-4 glitch-text text-twisted-neon"
            style={{
              textShadow:
                "0 0 8px #00ff66, 0 0 15px #00ff66, -2px -2px 0 #000, 0 -2px 0 #000, 2px -2px 0 #000, -2px 0 0 #000, 2px 0 0 #000, -2px 2px 0 #000, 0 2px 0 #000, 2px 2px 0 #000",
            }}
          >
            Twisted Cantina
          </h1>
          <p
            className="text-xl md:text-2xl mb-8 tracking-wide opacity-90 text-twisted-neon"
            style={{
              textShadow:
                "0 0 8px #00ff66, -2px -2px 0 #000, 0 -2px 0 #000, 2px -2px 0 #000, -2px 0 0 #000, 2px 0 0 #000, -2px 2px 0 #000, 0 2px 0 #000, 2px 2px 0 #000",
            }}
          >
            Mexican-inspired cocktails, tacos & nightlife in Pilsen
          </p>

          {/* START: Social Proof Section */}
          <div className="mt-2 mb-8 flex flex-col sm:flex-row items-center md:items-start gap-x-8 gap-y-3 text-sm text-neutral-300 font-mono">
            {/* Google Ratings */}
            <a
              href="https://www.google.com/search?q=Twisted+Cantina+Chicago" // Replace with actual Google review link if available
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 group"
              title="View Google Reviews"
            >
              <div className="flex">
                {[...Array(4)].map((_, i) => <StarIcon key={`filled-${i}`} filled={true} />)}
                <StarIcon key="empty-1" filled={false} /> {/* 5th star, not filled */}
              </div>
              <span className="group-hover:text-twisted-neon transition-colors duration-200">
                4.0 <span className="text-neutral-400">(305 Reviews)</span>
              </span>
            </a>

            {/* Instagram Followers */}
            <a
              href="https://instagram.com/TwistedCantina" // Your Instagram link
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 group"
              title="Follow us on Instagram"
            >
              <InstagramIcon className="group-hover:text-pink-400 transition-colors duration-200" />
              <span className="group-hover:text-twisted-neon transition-colors duration-200">
                5.4k <span className="text-neutral-400">Followers</span>
              </span>
            </a>
          </div>
          {/* END: Social Proof Section */}

          <div className="hidden md:flex flex-col sm:flex-row justify-center md:justify-start gap-6 mt-4"> {/* Adjusted mt from mt-8 */}
            <Link href="/menu" passHref>
              <Button variant="primary">Menu</Button>
            </Link>
            <Link href="/info" passHref>
              <Button variant="primary">Info</Button>
            </Link>
          </div>
          <div className="flex justify-center mt-8 md:hidden">
            <Button
              variant="primary"
              onClick={() => setShowVideoModal(true)}
            >
              Preview Your Night
            </Button>
          </div>
        </div>

        {/* Right Column: Video Preview (Desktop Only) */}
        <div className="hidden md:flex flex-col items-center md:items-end md:w-1/2">
          <div
            className="relative w-full max-w-sm aspect-[9/16] rounded-lg overflow-hidden shadow-lg flex items-center justify-center bg-black border-2 border-twisted-neon"
            style={{ minHeight: "480px" }}
          >
            {!videoPlaying && (
              <>
                <img
                  src="/video-preview.png"
                  alt="Preview Your Night"
                  className="absolute inset-0 w-full h-full object-cover z-10 opacity-60"
                />
                <button
                  className="absolute inset-0 flex items-center justify-center z-20 focus:outline-none group"
                  style={{ background: "rgba(0,0,0,0.4)" }}
                  onClick={handleDesktopPlayClick}
                  aria-label="Play Video"
                >
                  <span className="bg-twisted-neon/80 rounded-full p-4 shadow-lg flex items-center justify-center group-hover:bg-twisted-neon group-hover:scale-110 transition-all duration-200">
                    <svg
                      width="36"
                      height="36"
                      fill="black"
                      viewBox="0 0 24 24"
                    >
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </span>
                </button>
              </>
            )}
            <video
              ref={videoRef}
              src="/Instagram Reels Video 650.mp4"
              className={`absolute inset-0 w-full h-full object-contain ${videoPlaying ? "block z-30" : "hidden"}`}
              style={{ background: "#000" }}
              controls
              onPause={() => setVideoPlaying(false)}
              onEnded={() => setVideoPlaying(false)}
            />
          </div>
          <p className="text-sm text-gray-400 mt-2 text-center md:text-right">
            Preview the vibe
          </p>
        </div>
      </div>

      {showVideoModal && isMobile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="relative w-[95vw] md:w-auto md:max-w-md h-auto max-h-[90vh] bg-black rounded-lg overflow-hidden shadow-2xl flex flex-col items-center justify-center border-2 border-twisted-neon">
            <button
              className="absolute top-2 right-2 z-10 flex items-center justify-center w-8 h-8 bg-black rounded-full border border-twisted-neon hover:bg-twisted-neon group"
              onClick={() => setShowVideoModal(false)}
              aria-label="Close"
            >
              <svg
                className="w-5 h-5 text-twisted-neon group-hover:text-black"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <video
              src="/Instagram Reels Video 650.mp4"
              className="w-full h-full object-contain max-h-[85vh]"
              style={{ aspectRatio: "9/16", background: "#000" }}
              controls
              autoPlay
              onEnded={() => {
                setShowVideoModal(false);
              }}
            />
          </div>
        </div>
      )}

      <style jsx global>{`
        .text-twisted-neon {
          color: #00ff66;
        }
        .border-twisted-neon {
          border-color: #00ff66;
        }
        .bg-twisted-neon {
          background-color: #00ff66;
        }

        @keyframes scanline {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 100%;
          }
        }
        .glitch-text {
          animation: glitch 1s linear infinite alternate-reverse;
        }
        @keyframes glitch {
          2%,
          64% {
            transform: translate(1px, 0) skew(0deg);
          }
          4%,
          60% {
            transform: translate(-1px, 0) skew(0deg);
          }
          62% {
            transform: translate(0, 0) skew(2deg);
          }
        }
        /* You can define .font-mono in your global styles or tailwind.config.js if not already present */
        /* For example, in tailwind.config.js:
        theme: {
          extend: {
            fontFamily: {
              mono: ['"Courier New"', 'Courier', 'monospace'], // Example
            },
          },
        },
        */
        .font-mono {
          font-family: "Menlo", "Consolas", "Monaco", "Liberation Mono", "Lucida Console", monospace; /* Common mono stack */
        }
      `}</style>
    </section>
  );
};

export default Hero;