"use client";

import { useRef, useEffect, useState } from "react";
import Button from "./Button"; // Import the Button component

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

  // Function to handle playing the video on desktop
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden rounded-b-lg bg-black" // Added bg-black as fallback
      style={{
        backgroundImage: "url('/hero-section.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      data-oid="ae3qg2k"
    >
      {/* Optional: Add a semi-transparent overlay */}
      <div
        className="absolute inset-0 bg-black/50 z-10"
        data-oid="ely0foi"
      ></div>

      {/* Two-column layout container */}
      <div
        className="relative z-20 flex flex-col md:flex-row w-full max-w-6xl mx-auto px-4 items-center justify-between gap-8 md:gap-16"
        data-oid="2lktp21"
      >
        {/* Left Column: Text and CTAs */}
        <div
          className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/2"
          data-oid="vxckehm"
        >
          <h1
            className="text-6xl md:text-7xl lg:text-8xl font-bold mb-4 glitch-text text-twisted-neon font-akatab"
            style={{
              textShadow:
                "0 0 8px #2CFF05, 0 0 15px #2CFF05, -2px -2px 0 #000, 0 -2px 0 #000, 2px -2px 0 #000, -2px 0 0 #000, 2px 0 0 #000, -2px 2px 0 #000, 0 2px 0 #000, 2px 2px 0 #000",
            }}
            data-oid="cqrnw7a"
          >
            Twisted Cantina
          </h1>
          <p
            className="text-xl md:text-2xl mb-8 tracking-wide opacity-90 text-twisted-neon"
            style={{
              textShadow:
                "0 0 8px #2CFF05, -2px -2px 0 #000, 0 -2px 0 #000, 2px -2px 0 #000, -2px 0 0 #000, 2px 0 0 #000, -2px 2px 0 #000, 0 2px 0 #000, 2px 2px 0 #000",
            }}
            data-oid="uri2xr8"
          >
            Mexican-inspired cocktails, tacos & nightlife in Pilsen
          </p>
          {/* Buttons - Hide on mobile, show on desktop */}
          <div
            className="hidden md:flex flex-col sm:flex-row justify-center md:justify-start gap-6 mt-8"
            data-oid="q8-xll4"
          >
            <Button
              variant="primary"
              onClick={() => {
                /* Add scroll logic if needed */
              }}
              data-oid="vgxj4on"
            >
              Specials
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                /* Add scroll logic if needed */
              }}
              data-oid="kh41wd1"
            >
              Events
            </Button>
          </div>
          {/* Mobile Only Button - Show on mobile, hide on desktop */}
          <div
            className="flex justify-center mt-8 md:hidden"
            data-oid="f:y7i8d"
          >
            <Button
              variant="primary"
              onClick={() => setShowVideoModal(true)}
              data-oid="_.bf2d9"
            >
              Preview Your Night
            </Button>
          </div>
        </div>

        {/* Right Column: Video Preview (Desktop Only) */}
        <div
          className="hidden md:flex flex-col items-center md:items-end md:w-1/2"
          data-oid=":i6e5ts"
        >
          <div
            className="relative w-full max-w-sm aspect-[9/16] rounded-lg overflow-hidden shadow-lg flex items-center justify-center bg-black border-2 border-twisted-neon"
            style={{ minHeight: "480px" }}
            data-oid="ljso6:c"
          >
            {!videoPlaying && (
              <button
                className="absolute inset-0 flex items-center justify-center z-20 focus:outline-none group"
                style={{ background: "rgba(0,0,0,0.4)" }}
                onClick={handleDesktopPlayClick}
                aria-label="Play Video"
                data-oid="86l_pa8"
              >
                <span
                  className="bg-twisted-neon/80 rounded-full p-4 shadow-lg flex items-center justify-center group-hover:bg-twisted-neon group-hover:scale-110 transition-all duration-200"
                  data-oid="yn8t5a9"
                >
                  <svg
                    width="36"
                    height="36"
                    fill="black"
                    viewBox="0 0 24 24"
                    data-oid="l.hoh:6"
                  >
                    <polygon points="5,3 19,12 5,21" data-oid="hswi_pu" />
                  </svg>
                </span>
              </button>
            )}
            {/* Video Element with poster attribute */}
            <video
              ref={videoRef}
              src="/instagram-reels-video-650.mp4" // Renamed to remove spaces
              poster="/video-preview.png" // Use poster attribute for preview image
              className={`absolute inset-0 w-full h-full object-contain ${
                videoPlaying ? "block z-30" : "hidden"
              }`}
              style={{ background: "#000" }}
              controls
              preload="metadata"
              onPause={() => setVideoPlaying(false)}
              onEnded={() => setVideoPlaying(false)}
              data-oid="w7wsgn."
            />
          </div>
          <p
            className="text-sm text-gray-400 mt-2 text-center md:text-right"
            data-oid="y4e:x-n"
          >
            Preview the vibe
          </p>
        </div>
      </div>

      {/* Modal for video preview (Mobile Only) */}
      {showVideoModal && isMobile && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          data-oid="on9_tc3"
        >
          <div
            className="relative w-[95vw] md:w-auto md:max-w-md h-auto max-h-[90vh] bg-black rounded-lg overflow-hidden shadow-2xl flex flex-col items-center justify-center border-2 border-twisted-neon"
            data-oid="hfi9osu"
          >
            <button
              className="absolute top-2 right-2 z-10 flex items-center justify-center w-8 h-8 bg-black rounded-full border border-twisted-neon hover:bg-twisted-neon group"
              onClick={() => setShowVideoModal(false)}
              aria-label="Close"
              data-oid="btzw0y-"
            >
              <svg
                className="w-5 h-5 text-twisted-neon group-hover:text-black"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                data-oid="-8uvdqn"
              >
                <line x1="18" y1="6" x2="6" y2="18" data-oid="a_oqwxi" />
                <line x1="6" y1="6" x2="18" y2="18" data-oid=".727g7-" />
              </svg>
            </button>
            <video
              src="/instagram-reels-video-650.mp4" // Renamed to remove spaces
              className="w-full h-full object-contain max-h-[85vh]"
              style={{ aspectRatio: "9/16", background: "#000" }}
              controls
              poster="/video-preview.png" // Added poster attribute
              autoPlay
              onEnded={() => {
                setShowVideoModal(false);
              }}
              data-oid="08n.7gw"
            />
          </div>
        </div>
      )}

      {/* Define styles */}
      <style jsx global data-oid="n07tonc">{`
        .text-twisted-neon {
          color: #2cff05;
        }
        .border-twisted-neon {
          border-color: #2cff05;
        }
        .bg-twisted-neon {
          background-color: #2cff05;
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
        .font-mono {
          font-family: "Courier New", Courier, monospace;
        }
      `}</style>
    </section>
  );
};

export default Hero;
