"use client";

import { useRef, useEffect, useState } from "react";
import Button from "./Button"; // Import the new Button component

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [showVideoModal, setShowVideoModal] = useState(false); // Keep modal state if needed for mobile
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden rounded-b-lg"
      // Apply background styles directly or keep the overlay structure if preferred
      style={{
        backgroundImage: "url('/hero-section.png')", // Assuming you want the direct background image
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      data-oid="a537xxi"
    >
      {/* Optional: Add a semi-transparent overlay if needed */}
      <div
        className="absolute inset-0 bg-black/50 z-10"
        data-oid=".22:2p6"
      ></div>

      {/* Two-column layout container */}
      <div
        className="relative z-20 flex flex-col md:flex-row w-full max-w-6xl mx-auto px-4 items-center justify-between gap-8 md:gap-16"
        data-oid="_-bih7i"
      >
        {/* Left Column: Text and CTAs */}
        <div
          className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/2"
          data-oid="ays2e9."
        >
          <h1
            className="text-6xl md:text-7xl lg:text-8xl font-bold mb-4 glitch-text text-twisted-neon"
            style={{
              textShadow:
                "0 0 8px #2CFF05, 0 0 15px #2CFF05, -2px -2px 0 #000, 0 -2px 0 #000, 2px -2px 0 #000, -2px 0 0 #000, 2px 0 0 #000, -2px 2px 0 #000, 0 2px 0 #000, 2px 2px 0 #000",
            }}
            data-oid="2ntijlw"
          >
            {" "}
            {/* Changed green color */}
            Twisted Cantina
          </h1>
          <p
            className="text-xl md:text-2xl mb-8 tracking-wide opacity-90 text-twisted-neon"
            style={{
              textShadow:
                "0 0 8px #2CFF05, -2px -2px 0 #000, 0 -2px 0 #000, 2px -2px 0 #000, -2px 0 0 #000, 2px 0 0 #000, -2px 2px 0 #000, 0 2px 0 #000, 2px 2px 0 #000",
            }}
            data-oid="69m1ozq"
          >
            {" "}
            {/* Changed green color */}
            Mexican-inspired cocktails, tacos & nightlife in Pilsen
          </p>
          {/* Buttons - Hide on mobile, show on desktop */}
          <div
            className="hidden md:flex flex-col sm:flex-row justify-center md:justify-start gap-6 mt-8"
            data-oid="sg_ktd0"
          >
            {" "}
            {/* Hide on mobile (default), show on md and up */}
            <Button
              variant="primary"
              onClick={() => {
                /* Add scroll logic if needed */
              }}
              data-oid="x9pn_ei"
            >
              Specials
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                /* Add scroll logic if needed */
              }}
              data-oid="31zdskd"
            >
              Events
            </Button>
          </div>
          {/* Mobile Only Button - Show on mobile, hide on desktop */}
          <div
            className="flex justify-center mt-8 md:hidden"
            data-oid="oi6iwqd"
          >
            {" "}
            {/* Show only on mobile */}
            <Button
              variant="primary"
              onClick={() => setShowVideoModal(true)} // Trigger the modal
              data-oid="8q76w8o"
            >
              Preview Your Night
            </Button>
          </div>
        </div>

        {/* Right Column: Video Preview (Desktop Only) */}
        <div
          className="hidden md:flex flex-col items-center md:items-end md:w-1/2 right-auto bottom-auto absolute left-[256px] -top-[166px]"
          data-oid="3v2m.pt"
        >
          {" "}
          {/* Added flex-col and items-end */}
          {/* Moved Caption Inside the Right Column Div */}
          <p
            className="text-sm text-gray-400 mt-2 text-center md:text-right"
            data-oid="9sz6lic"
          >
            Preview the vibe
          </p>
          <div
            className="w-full max-w-sm aspect-[9/16] rounded-lg overflow-hidden shadow-lg flex items-center justify-center bg-black border-2 border-twisted-neon absolute left-[509px] top-[44px]"
            style={{ minHeight: "480px" }}
            data-oid="qceka5a"
          >
            {!videoPlaying && (
              <>
                {/* Preview Image */}
                <img
                  src="/video-preview.png" // Make sure this image exists
                  alt="Preview Your Night"
                  className="absolute inset-0 w-full h-full object-cover z-10 opacity-60 left-[21px] -top-[25px]"
                  data-oid="03v6w47"
                />

                {/* Play Button Overlay */}
                <button
                  className="absolute inset-0 flex items-center justify-center z-20 focus:outline-none group left-[11px] -top-[3px]"
                  style={{ background: "rgba(0,0,0,0.4)" }}
                  onClick={handleDesktopPlayClick} // Use the desktop-specific handler
                  aria-label="Play Video"
                  data-oid="zm:--41"
                >
                  <span
                    className="bg-twisted-neon/80 rounded-full p-4 shadow-lg flex items-center justify-center group-hover:bg-twisted-neon group-hover:scale-110 transition-all duration-200"
                    data-oid="1li_s9j"
                  >
                    <svg
                      width="36"
                      height="36"
                      fill="black"
                      viewBox="0 0 24 24"
                      data-oid="w::u7o:"
                    >
                      <polygon points="5,3 19,12 5,21" data-oid="mg3_3_z" />
                    </svg>
                  </span>
                </button>
              </>
            )}
            {/* Video Element */}
            <video
              ref={videoRef}
              src="/Instagram Reels Video 650.mp4" // Make sure this video exists
              className={`absolute inset-0 w-full h-full object-contain ${videoPlaying ? "block z-30" : "hidden"}`}
              style={{ background: "#000" }}
              controls // Show controls when playing
              onPause={() => setVideoPlaying(false)}
              onEnded={() => setVideoPlaying(false)}
              data-oid="d-_7qtw"
            />
          </div>
        </div>
        {/* Removed Caption from here */}
      </div>

      {/* Modal for video preview (Mobile Only) */}
      {showVideoModal && isMobile && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          data-oid="s9kgzso"
        >
          <div
            className="relative w-[95vw] md:w-auto md:max-w-md h-auto max-h-[90vh] bg-black rounded-lg overflow-hidden shadow-2xl flex flex-col items-center justify-center border-2 border-twisted-neon"
            data-oid="p0gzpnu"
          >
            <button
              className="absolute top-2 right-2 z-10 flex items-center justify-center w-8 h-8 bg-black rounded-full border border-twisted-neon hover:bg-twisted-neon group"
              onClick={() => setShowVideoModal(false)}
              aria-label="Close"
              data-oid="4-fq7q5"
            >
              <svg
                className="w-5 h-5 text-twisted-neon group-hover:text-black"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                data-oid="cr8_g84"
              >
                <line x1="18" y1="6" x2="6" y2="18" data-oid="6939g56" />
                <line x1="6" y1="6" x2="18" y2="18" data-oid="zgadika" />
              </svg>
            </button>
            <video // ref={videoRef} // Ref might not be needed if modal plays immediately
              src="/Instagram Reels Video 650.mp4"
              className="w-full h-full object-contain max-h-[85vh]"
              style={{ aspectRatio: "9/16", background: "#000" }}
              controls
              autoPlay
              onEnded={() => {
                setShowVideoModal(false);
              }} // Close modal on end
              data-oid="_62r9xv"
            />
          </div>
        </div>
      )}

      {/* Make sure text-twisted-neon and glitch-text styles are defined */}
      <style jsx global data-oid="ztcszhz">{`
        .text-twisted-neon {
          color: #2cff05; /* Changed to new green color */
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
          /* Basic glitch placeholder - enhance further if needed */
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
        .bg-noise {
          /* background-image: url('/noise.png'); */
        }
        .font-mono {
          font-family:
            "Courier New", Courier, monospace; /* Example VCR-like font */
        }
      `}</style>
    </section> // Added the missing closing section tag here
  );
};

export default Hero;
