'use client';

import { useState } from 'react';
import { Copy, Instagram, Map } from 'lucide-react';

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
    <footer id="contact" className="bg-twisted-darker pt-16 pb-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 vinyl-record-lg opacity-5"></div>
      <div className="absolute bottom-0 left-0 cassette-tape-lg opacity-5"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Location */}
          <div>
            <h3 className="text-2xl font-bold mb-6 cyber-text">Location</h3>
            <div className="relative chrome-border-sm p-6 mb-6">
              <button 
                onClick={handleCopyAddress}
                className="flex items-center mb-4 hover:text-twisted-neon transition group"
              >
                <span className="mr-2">{address}</span>
                <Copy size={16} className="group-hover:scale-110 transition" />
              </button>
              {copied && (
                <div className="absolute top-0 right-0 bg-twisted-neon text-black py-1 px-2 text-xs">
                  Copied!
                </div>
              )}
              
              <a 
                href="https://www.google.com/maps?q=1640+S+Blue+Island+Ave%2C+Chicago%2C+IL+60608"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-twisted-neon hover:underline"
              >
                <Map size={16} className="mr-1" />
                View on Google Maps
              </a>
            </div>
          </div>
          
          {/* Hours */}
          <div>
            <h3 className="text-2xl font-bold mb-6 cyber-text">Hours</h3>
            <div className="chrome-border-sm p-6">
              <ul className="space-y-2">
                {hours.map((item) => (
                  <li key={item.day} className="flex justify-between">
                    <span className="font-bold">{item.day}</span>
                    <span>{item.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-6">
              <a 
                href="https://instagram.com/twistedcantina"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-twisted-neon transition"
              >
                <Instagram size={24} className="mr-2" />
                @twistedcantina
              </a>
            </div>
          </div>
          
          {/* About */}
          <div className="lg:col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-6 cyber-text">About</h3>
            <p className="mb-4">
              Twisted Cantina is a Mexican-inspired cocktail bar and dance club in Pilsen, Chicago. 
              Known for creative cocktails, tacos, and a vibrant nightlife scene with DJs and Sunday specials.
            </p>
            <p className="text-sm opacity-70">
              We're a 21+ venue focused on providing the best nightlife experience in Chicago with 
              an emphasis on quality drinks, food, and music in a unique atmosphere.
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-center md:text-left mb-4 md:mb-0 text-sm opacity-70">
            © {new Date().getFullYear()} Twisted Cantina. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-sm hover:text-twisted-neon transition">Privacy Policy</a>
            <a href="#" className="text-sm hover:text-twisted-neon transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;