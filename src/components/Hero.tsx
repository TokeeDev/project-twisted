import { useEffect, useRef } from 'react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          heroRef.current?.classList.add('animate-in');
        }
      },
      {
        threshold: 0.1
      }
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
  
  return (
    <section 
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden rounded-b-lg"
    >
      {/* Background image with grain effect overlay */}
      <div className="absolute inset-0 z-0 rounded-b-lg">
        <div 
          className="absolute inset-0 bg-black opacity-40 z-10 rounded-b-lg"
          style={{ 
            backgroundImage: `url('https://images.pexels.com/photos/274192/pexels-photo-274192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(100%) contrast(120%)'
          }}
        ></div>
        {/* Grain overlay */}
        <div className="absolute inset-0 z-20 bg-noise opacity-30 mix-blend-overlay"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-30 text-center max-w-4xl px-4 hero-content">
        <h1 className="text-6xl md:text-8xl font-bold mb-4 glitch-text">
          Twisted Cantina
        </h1>
        <p className="text-xl md:text-2xl mb-8 tracking-wide chrome-text">
          Mexican-inspired cocktails, tacos & nightlife in Pilsen
        </p>
        
        {/* Graphic elements */}
        <div className="absolute -top-20 -left-20 md:block hidden">
          <div className="vinyl-record"></div>
        </div>
        <div className="absolute -bottom-16 -right-16 md:block hidden">
          <div className="cassette-tape"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;