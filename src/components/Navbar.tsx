import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-2 ' 
          : 'py-4 '
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className={`flex items-center justify-between rounded-full px-6 py-2 transition-colors duration-300 ${
          scrolled ? 'bg-black/75 backdrop-blur-md' : 'bg-transparent'
        }`}>
          <a href="/" className="text-2xl md:text-3xl font-bold text-white cyber-text">
            Twisted
          </a>
          
          <div className="hidden md:flex items-center space-x-8">
            {['Menu', 'Events', 'About', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="nav-link text-white font-medium hover:text-twisted-neon transition-colors relative"
              >
                {item}
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
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-twisted-black/95 backdrop-blur-md p-4">
          <div className="flex flex-col space-y-4 px-4">
            {['Menu', 'Events', 'About', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-white font-medium py-2 hover:text-twisted-neon transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;