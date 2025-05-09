"use client";

import { useState } from "react";
import { MapPin, Copy, Phone, Mail, Instagram } from "lucide-react";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const address = "1640 S Blue Island Ave, Chicago, IL 60608";
  const hours = [
    { day: "Mon – Tue", time: "Closed" },
    { day: "Wed – Thu", time: "5 PM – 12 AM" },
    { day: "Fri – Sat", time: "5 PM – 2 AM" },
    { day: "Sun", time: "5 PM – 12 AM" },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-[#0a0a0a] text-[#DDD] px-6 py-16">
      {/* Top Grid */}
      <div className="max-w-6xl mx-auto grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {/* Find Us */}
        <div>
          <h4 className="text-xl font-bold mb-4">Find Us</h4>
          <button
            onClick={handleCopy}
            className="flex items-center space-x-2 mb-2 text-sm hover:text-[#39FF14] transition"
          >
            <MapPin size={16} /> 
            <span>{address}</span>
            <Copy size={14} className="opacity-75" />
          </button>
          {copied && (
            <p className="text-xs text-[#39FF14] mb-2">Address copied!</p>
          )}
          <a
            href="https://maps.google.com?q=1640+S+Blue+Island+Ave+Chicago"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-sm hover:underline text-[#39FF14]"
          >
            <MapPin size={14} /> View on Google Maps
          </a>
        </div>

        {/* Opening Hours */}
        <div>
          <h4 className="text-xl font-bold mb-4">Opening Hours</h4>
          <ul className="space-y-1 text-sm">
            {hours.map((h) => (
              <li key={h.day} className="flex justify-between">
                <span className="font-semibold">{h.day}</span>
                <span>{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xl font-bold mb-4">Contact</h4>
          <p className="flex items-center space-x-2 mb-2 text-sm">
            <Phone size={16} />
            <a href="tel:+13122650923" className="hover:text-[#39FF14]">
              (312) 265-0923
            </a>
          </p>
          <p className="flex items-center space-x-2 text-sm">
            <Mail size={16} />
            <a href="mailto:jose@twistedcantina.com" className="hover:text-[#39FF14]">
              jose@twistedcantina.com
            </a>
          </p>
        </div>

        {/* Follow Us */}
        <div>
          <h4 className="text-xl font-bold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a
              href="https://instagram.com/TwistedCantina"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#39FF14] transition"
            >
              <Instagram size={24} />
            </a>
            <a
             href="https://instagram.com/TwistedCantina"
             className="hover:text-[#39FF14] transition"
            >@Twistedcantina</a>
            {/* Add more icons here if desired */}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center text-sm">
        <p className="mb-4 md:mb-0">
          © {new Date().getFullYear()} <strong>Twisted Cantina</strong>. All rights reserved.
        </p>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-[#39FF14]">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-[#39FF14]">
            Terms of Service
          </a>
          <a href="#" className="hover:text-[#39FF14]">
            Accessibility
          </a>
        </div>
      </div>
    </footer>
  );
}
