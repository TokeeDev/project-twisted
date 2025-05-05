"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Home,
  UtensilsCrossed,
  Calendar,
  Info,
  Phone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  {
    label: "Menu",
    href: "/menu",
    icon: <UtensilsCrossed size={18} data-oid="sah3xwf" />,
  },
  {
    label: "Events",
    href: "/events",
    icon: <Calendar size={18} data-oid="_wa1k_e" />,
  },
  {
    label: "About",
    href: "/about",
    icon: <Info size={18} data-oid="oix27_v" />,
  },
  {
    label: "Contact",
    href: "/contact",
    icon: <Phone size={18} data-oid="1ai4-d4" />,
  },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activePath, setActivePath] = useState("/");

  // Handle scroll effect for navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // Set initial active path
    setActivePath(window.location.pathname);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-1" : "py-3"
      }`}
      data-oid="yxvgjbv"
    >
      <div className="container mx-auto px-4 pt-[16px]" data-oid="3cfrq5a">
        <nav
          className={`flex items-center justify-between rounded-lg px-4 py-2 transition-all duration-300 ${
            scrolled
              ? "bg-twisted-darker/95 backdrop-blur-md shadow-lg"
              : "bg-black/80 backdrop-blur-sm"
          }`}
          data-oid="49ebab6"
        >
          <Link
            href="/"
            className="flex items-center space-x-2"
            data-oid="t0r7-k1"
          >
            <Image
              src="/twisted-logo.png"
              alt="Twisted Cantina"
              width={48}
              height={48}
              className="object-contain rounded-none w-full relative top-auto right-auto bottom-auto left-auto h-[34px]"
              data-oid="oc_y12j"
            />
          </Link>

          {/* Desktop Navigation */}
          <div
            className="hidden md:flex items-center space-x-1 lg:space-x-2"
            data-oid="752i:kp"
          >
            {navItems.map((item) => {
              const isActive = activePath === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-twisted-neon/10 text-twisted-neon"
                      : "text-twisted-white hover:bg-white/10 hover:text-twisted-neon"
                  }`}
                  data-oid="ducli9s"
                >
                  <span className="hidden lg:block" data-oid="ttbcsn2">
                    {item.icon}
                  </span>
                  <span
                    className={`${isActive ? "font-bold" : ""}`}
                    data-oid="udkbffq"
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 h-0.5 w-full bg-twisted-neon"
                      data-oid="18ze639"
                    ></span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-md text-twisted-white hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            data-oid="ge0e1x4"
          >
            {mobileMenuOpen ? (
              <X size={24} data-oid=".mb8p5d" />
            ) : (
              <Menu size={24} data-oid="fnn6g2h" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
        data-oid="c3cekxx"
      />

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden fixed top-[60px] right-0 bottom-0 w-[75%] max-w-sm bg-twisted-darker border-l border-twisted-neon/20 z-50 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        data-oid="s3yrdvu"
      >
        <div
          className="flex flex-col py-6 rounded-none justify-end h-[508px] w-[237px]"
          data-oid="bw0lr46"
        >
          <div className="px-6 mb-6" data-oid="pgc.kle">
            <h2
              className="text-xl font-bold text-twisted-white"
              data-oid="vnekuio"
            >
              Navigation
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto" data-oid="-buk0ei">
            <div
              className="flex flex-col space-y-1 px-4 h-[430px] w-[241px]"
              data-oid="vyypjum"
            >
              <Link
                href="/"
                className={`flex items-center space-x-3 px-4 py-3 rounded-md font-medium ${
                  activePath === "/"
                    ? "bg-twisted-neon/10 text-twisted-neon"
                    : "text-twisted-white hover:bg-white/5"
                }`}
                onClick={() => setMobileMenuOpen(false)}
                data-oid="9wr2v61"
              >
                <Home size={20} data-oid="dusuoau" />
                <span data-oid="p-0ox29">Home</span>
              </Link>

              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-md font-medium ${
                    activePath === item.href
                      ? "bg-twisted-neon/10 text-twisted-neon"
                      : "text-twisted-white hover:bg-white/5"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  data-oid="clk-a.2"
                >
                  {item.icon}
                  <span data-oid="whzc6.z">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div
            className="mt-auto px-6 pt-6 border-t border-white/10"
            data-oid="bxyowra"
          >
            <div className="flex justify-center" data-oid="smu1ot9">
              <span className="text-sm text-white/60" data-oid="-8ob06d">
                © 2024 Twisted Cantina
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
