"use client";

import React from "react";

const MenuHero = () => {
  return (
    <section
      className="relative py-20 md:py-32 bg-black text-white overflow-hidden border-b-4 border-white"
      data-oid="w22neez"
    >
      {/* Background Elements - Distorted Grid/Lines */}
      <div className="absolute inset-0 z-0 opacity-10" data-oid="ccqjyyt">
        {/* Example: Add SVG or complex background patterns here for distortion */}
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          data-oid="u04re9x"
        >
          <defs data-oid="wwt_exz">
            <pattern
              id="grid"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
              data-oid="l_ff2.i"
            >
              <path
                d="M 80 0 L 0 0 0 80"
                fill="none"
                stroke="#555"
                strokeWidth="1"
                data-oid="3h7vl1k"
              />
            </pattern>
            <filter
              id="distortion"
              x="0"
              y="0"
              width="100%"
              height="100%"
              data-oid="lr7qqq8"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.01 0.04"
                numOctaves="2"
                result="warp"
                data-oid=":5g8f54"
              />

              <feDisplacementMap
                xChannelSelector="R"
                yChannelSelector="G"
                scale="50"
                in="SourceGraphic"
                in2="warp"
                data-oid="ljvozs0"
              />
            </filter>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#grid)"
            filter="url(#distortion)"
            data-oid="oz19z79"
          />
        </svg>
      </div>

      {/* Content */}
      <div
        className="relative z-10 container mx-auto px-4 text-center"
        data-oid="gljheqp"
      >
        <h1
          className="text-6xl md:text-8xl lg:text-9xl font-black mb-4 uppercase tracking-tighter"
          style={{
            fontFamily: '"Impact", "Arial Black", sans-serif', // Example bold font
            textShadow: "2px 2px 0px #fff, 4px 4px 0px #555", // Simple shadow for depth
            transform: "skewX(-10deg)", // Slight skew for dynamic feel
            letterSpacing: "-0.05em", // Tighten spacing
          }}
          data-oid="z2.kxeo"
        >
          Our Menu
        </h1>
        <p
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          style={{
            fontFamily: '"Courier New", monospace', // Monospace for contrast
            transform: "skewX(-10deg)",
          }}
          data-oid="dpvb1v7"
        >
          Explore our twisted creations. Bold flavors, unique combinations.
        </p>
      </div>

      {/* Graffiti/Street Art Elements (Optional - could be images/SVGs) */}
      {/* Example: Add absolutely positioned elements that look like paint splatters or tags */}
      <div
        className="absolute bottom-0 left-5 w-24 h-24 bg-contain bg-no-repeat opacity-60"
        style={{
          backgroundImage: "url(/path/to/splatter1.svg)",
          transform: "rotate(-15deg)",
        }} // Replace with actual SVG path
        data-oid="a:-bm7j"
      ></div>
      <div
        className="absolute top-10 right-5 w-32 h-16 bg-contain bg-no-repeat opacity-50"
        style={{
          backgroundImage: "url(/path/to/tag1.svg)",
          transform: "rotate(10deg)",
        }} // Replace with actual SVG path
        data-oid="4_snb1r"
      ></div>
    </section>
  );
};

export default MenuHero;
