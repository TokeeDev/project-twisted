"use client";

import React from "react";
import Link from "next/link"; // Add import for Link

const FeaturedMenu = () => {
  return (
    <section id="menu" className="py-20 bg-black text-white" data-oid="k9g0jfq">
      <div className="container mx-auto px-4" data-oid="jmhopj7">
        <h2
          className="text-6xl md:text-7xl font-black mb-10 text-center uppercase tracking-tighter"
          style={{
            fontFamily: '"Impact", "Arial Black", sans-serif',
            textShadow: "2px 2px 0px #fff, 3px 3px 0px #555",
            transform: "skewX(-10deg)",
            letterSpacing: "-0.05em",
          }}
          data-oid="dknkzd2"
        >
          Our Menu
        </h2>
        <div className="mt-12 text-center" data-oid="5i:oik2">
          {/* Wrap button with Link */}
          <Link href="/menu" passHref data-oid="1ce67op">
            <button
              className="cyber-button px-10 py-4 font-black text-xl md:text-2xl uppercase tracking-tight transform hover:scale-105 transition-transform duration-200"
              style={{ textShadow: "1px 1px 0px #000" }}
              data-oid=":jo26y."
            >
              View Full Menu
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMenu;
