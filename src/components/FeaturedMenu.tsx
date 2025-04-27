import { useRef, useEffect } from 'react';

const menuCategories = [
  {
    id: 'food',
    title: 'Food',
    image: 'https://images.pexels.com/photos/2092897/pexels-photo-2092897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Mexican street food with a twist'
  },
  {
    id: 'drinks',
    title: 'Drinks',
    image: 'https://images.pexels.com/photos/452737/pexels-photo-452737.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Craft cocktails & mezcal specialties'
  },
  {
    id: 'specials',
    title: 'Specials',
    image: 'https://images.pexels.com/photos/3019019/pexels-photo-3019019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: '$5 Sunday margaritas & more'
  }
];

const FeaturedMenu = () => {
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
      id="menu"
      ref={sectionRef}
      className="py-24 overflow-hidden relative opacity-0 translate-y-8 menu-section"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 glitch-text text-center">
          Our Menu
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {menuCategories.map((category) => (
            <div key={category.id} className="menu-card group">
              <div className="relative overflow-hidden chrome-border h-80">
                {/* Image */}
                <div className="absolute inset-0">
                  <img 
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition duration-700 ease-in-out transform group-hover:scale-110 filter group-hover:brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-twisted-black/90 to-transparent"></div>
                </div>
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                  <h3 className="text-3xl font-bold cyber-text mb-2 group-hover:text-twisted-neon transition">
                    {category.title}
                  </h3>
                  <p className="text-sm mb-4">{category.description}</p>
                  <button className="cyber-button-sm px-4 py-2 self-start font-bold text-sm">
                    EXPLORE
                  </button>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 cassette-tape-sm opacity-70 group-hover:opacity-100 transition"></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Feature highlight */}
        <div className="mt-16 text-center">
          <p className="text-xl md:text-2xl cyber-text mb-6">
            Known for creative cocktails, tacos, and a vibrant nightlife scene
          </p>
          <button className="cyber-button px-6 py-3 font-bold">
            VIEW FULL MENU
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMenu;