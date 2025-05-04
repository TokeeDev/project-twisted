'use client';

import { useState, useEffect } from 'react';

import Hero from '../components/ui/Hero';
import FeaturedEvent from '../components/events/FeaturedEvent';
import Footer from '../components/ui/Footer';
import AgeVerification from '../components/ui/AgeVerification';
import FeaturedMenu from '../components/menu/FeaturedMenu';

export default function Home() {
  const [verifiedAge, setVerifiedAge] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isVerified = localStorage.getItem('ageVerified') === 'true';
    if (isVerified) {
      setVerifiedAge(true);
    }
    setLoading(false);
  }, []);

  const handleVerifyAge = () => {
    setVerifiedAge(true);
    localStorage.setItem('ageVerified', 'true');
  };

  if (loading) return null;

  return (
    <>
      <div className={`relative min-h-screen bg-black text-white font-sans ${!verifiedAge ? 'blur-md filter brightness-50' : ''}`}>
        <Hero />
        <FeaturedEvent />
        <FeaturedMenu/>
        <Footer />
      </div>
      {!verifiedAge && <AgeVerification onVerify={handleVerifyAge} />}
    </>
  );
}