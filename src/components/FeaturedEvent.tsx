import { useRef, useEffect } from 'react';

const FeaturedEvent = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current?.classList.add('animate-in');
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section 
      id="events"
      ref={sectionRef}
      className="py-24 overflow-hidden relative snap-start h-screen flex items-center event-section"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 glitch-text text-center">
          Featured Event
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Event Details & Description */}
          <div className="event-details text-left">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-twisted-neon text-lg font-semibold mb-1">SUNDAY FUNDAY</p>
                  <h3 className="text-4xl md:text-5xl font-bold cyber-text mb-4">TWISTED SITUATIONS</h3>
                </div>
                {/* Age badge moved to image or kept separate if needed */}
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <span className="text-twisted-neon mr-2 w-12">DATE:</span>
                  <span className="font-mono">APRIL 20 • 9PM 'TIL CLOSE</span>
                </div>
                <div className="flex items-center">
                  <span className="text-twisted-neon mr-2 w-12">DJs:</span>
                  <span className="font-mono">NEEKO • LITE • CEASE+</span>
                </div>
                <p className="mt-4 mb-4">
                  Join us for our hottest Sunday event featuring three amazing DJs spinning the 
                  best mix of Latin, hip-hop, and electronic beats. Drink specials all night!
                </p>
                <p className="text-sm font-mono">
                  1640 SOUTH BLUE ISLAND AVE. CHICAGO, IL 60608
                </p>
              </div>
              
              <button className="cyber-button px-8 py-3 font-bold mt-6">
                Register for Event
              </button>
            </div>
            {/* Removed decorative elements from here */}
          </div>
          
          {/* Right Column: Event Poster */}
          <div className="relative event-flyer transform transition-transform group">
            {/* Adjusted container height and removed aspect ratio constraint */}
            <div className="max-h-[75vh] overflow-hidden relative rounded-lg shadow-lg shadow-twisted-neon/20 group-hover:shadow-twisted-neon/40 transition-shadow duration-300">
              <img 
                src="https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=800&h=1067&dpr=1" 
                alt="Sunday Funday Event" 
                className="w-full h-full object-cover"
              />
              {/* Optional: Keep a subtle gradient if desired, otherwise remove this too */}
              {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-twisted-black/50"></div> */}
              
              {/* Removed Image Overlay & Text */}
            </div>
            
            {/* Removed star decorations */}
          </div>
        </div>

        {/* View All Events Link */}
        <div className="text-center mt-16">
          <a href="#" className="text-twisted-neon hover:underline font-semibold text-lg cyber-link">
            View all events
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvent;