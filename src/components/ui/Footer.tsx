"use client";

import { useState } from "react";
import { Copy, Instagram, Map } from "lucide-react";

const Footer = () => {
  const [copied, setCopied] = useState(false);

  const address = "1640 S Blue Island Ave, Chicago, IL 60608";
  const hours = [
    { day: "Mon", hours: "Closed" },
    { day: "Tue–Thu", hours: "5pm–12am" },
    { day: "Fri–Sat", hours: "5pm–2am" },
    { day: "Sun", hours: "5pm–12am" },
  ];

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer
      id="contact"
      className="bg-twisted-darker pt-16 pb-8 relative overflow-hidden"
      data-oid="f91mq:u"
    >
      {/* Decorative elements */}
      <div
        className="absolute top-0 right-0 vinyl-record-lg opacity-5"
        data-oid="yulmpvm"
      ></div>
      <div
        className="absolute bottom-0 left-0 cassette-tape-lg opacity-5"
        data-oid="4r0qd3x"
      ></div>

      <div className="container mx-auto px-4" data-oid="yx1ofv-">
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-12"
          data-oid="v5kpw2w"
        >
          {/* Location */}
          <div data-oid="yk0s0gb">
            <h3
              className="text-2xl font-bold mb-6 cyber-text"
              data-oid="al0ife2"
            >
              Location
            </h3>
            <div
              className="relative chrome-border-sm p-6 mb-6"
              data-oid="u7z2m.1"
            >
              <button
                onClick={handleCopyAddress}
                className="flex items-center mb-4 hover:text-twisted-neon transition group"
                data-oid="ip3ikpi"
              >
                <span className="mr-2" data-oid="kfy6d0p">
                  {address}
                </span>
                <Copy
                  size={16}
                  className="group-hover:scale-110 transition"
                  data-oid="7lngapd"
                />
              </button>
              {copied && (
                <div
                  className="absolute top-0 right-0 bg-twisted-neon text-black py-1 px-2 text-xs"
                  data-oid="dtz4u5p"
                >
                  Copied!
                </div>
              )}

              <a
                href="https://www.google.com/maps?q=1640+S+Blue+Island+Ave%2C+Chicago%2C+IL+60608"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-twisted-neon hover:underline"
                data-oid="ohwmcat"
              >
                <Map size={16} className="mr-1" data-oid="0f::d:b" />
                View on Google Maps
              </a>
            </div>
          </div>

          {/* Hours */}
          <div data-oid="g5hw5oc">
            <h3
              className="text-2xl font-bold mb-6 cyber-text"
              data-oid="wq8a9m."
            >
              Hours
            </h3>
            <div className="chrome-border-sm p-6" data-oid="q15v12e">
              <ul className="space-y-2" data-oid="_hg1dc-">
                {hours.map((item) => (
                  <li
                    key={item.day}
                    className="flex justify-between"
                    data-oid="06n.b6r"
                  >
                    <span className="font-bold" data-oid="9cw6-oz">
                      {item.day}
                    </span>
                    <span data-oid="jnq7cko">{item.hours}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6" data-oid="32tkno2">
              <a
                href="https://instagram.com/twistedcantina"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-twisted-neon transition"
                data-oid="ep1ux1a"
              >
                <Instagram size={24} className="mr-2" data-oid="ri76j0n" />
                @twistedcantina
              </a>
            </div>
          </div>

          {/* About */}
          <div className="lg:col-span-1 md:col-span-2" data-oid="opql9dg">
            <h3
              className="text-2xl font-bold mb-6 cyber-text"
              data-oid=".ydf9n1"
            >
              About
            </h3>
            <p className="mb-4" data-oid="v3cvm:l">
              Twisted Cantina is a Mexican-inspired cocktail bar and dance club
              in Pilsen, Chicago. Known for creative cocktails, tacos, and a
              vibrant nightlife scene with DJs and Sunday specials.
            </p>
            <p className="text-sm opacity-70" data-oid="pn6_.36">
              We're a 21+ venue focused on providing the best nightlife
              experience in Chicago with an emphasis on quality drinks, food,
              and music in a unique atmosphere.
            </p>
          </div>
        </div>

        <div
          className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center"
          data-oid="ta4k-z."
        >
          <p
            className="text-center md:text-left mb-4 md:mb-0 text-sm opacity-70"
            data-oid="k_sszaz"
          >
            © {new Date().getFullYear()} Twisted Cantina. All rights reserved.
          </p>
          <div className="flex space-x-6" data-oid="ed-vg8j">
            <a
              href="#"
              className="text-sm hover:text-twisted-neon transition"
              data-oid="mggb-1a"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm hover:text-twisted-neon transition"
              data-oid="p1aa62e"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
