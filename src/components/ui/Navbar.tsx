"use client";

import { useState } from "react"; // Removed useEffect
import { Menu } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  // Removed scrolled state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Removed useEffect for scroll handling

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-2" // Removed conditional padding and applied fixed padding
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between rounded-md px-6 py-2 transition-colors duration-300 bg-black/90 backdrop-blur-md">
          {" "}
          {/* Applied permanent background */}
          <a href="/" className="text-2xl md:text-3xl font-bold text-white">
            <Image
              src="/twisted-logo.png"
              alt="Logo"
              width={100}
              height={100}
            />
          </a>
          <div className="hidden md:flex items-center space-x-8">
            {[
              { label: "Menu", href: "/menu" },
              { label: "Events", href: "/events" },
              { label: "Info", href: "/info" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="nav-link text-white font-bold hover:text-twisted-neon transition-colors relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-twisted-neon after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </a>
            ))}
          </div>
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden absolute top-full left-4 right-4 bg-black/90 backdrop-blur-md rounded-b-3xl p-4 transition-transform duration-300 ease-in-out ${mobileMenuOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-full opacity-0 pointer-events-none"}`}
        style={{ willChange: "transform, opacity" }}
      >
        <div className="flex flex-col space-y-4 px-4">
          {[
            { label: "Menu", href: "/menu" },
            { label: "Events", href: "/events" },
            { label: "Info", href: "/info" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-white font-bold py-2 hover:text-twisted-neon transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
