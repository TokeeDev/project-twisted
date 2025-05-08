'use client';

import { useState } from 'react';
import Button from './Button'; // Import the new Button component

interface AgeVerificationProps {
  onVerify: () => void;
}

const AgeVerification = ({ onVerify }: AgeVerificationProps) => {
  const [error, setError] = useState(false);
  
  const handleVerify = () => {
    onVerify();
  };
  
  const handleDecline = () => {
    setError(true);
  };
  
  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md animate-fadeIn">
        <div className="max-w-md w-full bg-twisted-black/95 chrome-border p-8 text-center rounded-lg shadow-2xl border-2 border-white/20">
        {/* Added bg-twisted-black, rounded-lg, shadow-xl */}
        <h2 className="text-3xl font-bold mb-6 cyber-text">Age Verification</h2>
        
        <div className="age-badge-lg mx-auto mb-6">21+</div>
        
        <p className="mb-8">
          You must be 21 years or older to enter Twisted Cantina's website.
          By entering, you confirm you are at least 21 years of age.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button 
            variant="primary"
            onClick={handleVerify}
          >
            I am 21 or older
          </Button>
          
          <Button 
            variant="secondary"
            onClick={handleDecline}
            className="border-white hover:bg-white/10" // Keep existing border/hover if needed, or adjust Button component
          >
            I am under 21
          </Button>
        </div>
        
        {error && (
          <div className="mt-6 text-red-400">
            Sorry, you must be 21 or older to enter this site.
          </div>
        )}
      </div>
      </div>
  );
};

export default AgeVerification;