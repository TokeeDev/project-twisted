import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedEvent from './components/FeaturedEvent';
import FeaturedMenu from './components/FeaturedMenu';
import Footer from './components/Footer';
import AgeVerification from './components/AgeVerification';
import CursorEffect from './components/CursorEffect';

function App() {
  const [verifiedAge, setVerifiedAge] = useState(false);

  useEffect(() => {
    const isVerified = localStorage.getItem('ageVerified') === 'true';
    if (isVerified) {
      setVerifiedAge(true);
    }
  }, []);

  const handleVerifyAge = () => {
    setVerifiedAge(true);
    localStorage.setItem('ageVerified', 'true');
  };

  return (
    <>
      {!verifiedAge && <AgeVerification onVerify={handleVerifyAge} />}
      {verifiedAge && (
        <div className="relative min-h-screen bg-black text-white font-sans">
          <CursorEffect />
          <Navbar />
          <Hero />
          <FeaturedMenu />
          <FeaturedEvent />
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;