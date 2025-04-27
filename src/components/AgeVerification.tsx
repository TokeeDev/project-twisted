import { useState } from 'react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      {/* Added backdrop-blur-sm and changed background color/opacity */}
      <div className="max-w-md w-full bg-twisted-black chrome-border p-8 text-center rounded-lg shadow-xl">
        {/* Added bg-twisted-black, rounded-lg, shadow-xl */}
        <h2 className="text-3xl font-bold mb-6 cyber-text">Age Verification</h2>
        
        <div className="age-badge-lg mx-auto mb-6">21+</div>
        
        <p className="mb-8">
          You must be 21 years or older to enter Twisted Cantina's website.
          By entering, you confirm you are at least 21 years of age.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button 
            onClick={handleVerify}
            className="cyber-button px-6 py-3 font-bold"
          >
            I am 21 or older
          </button>
          
          <button 
            onClick={handleDecline}
            className="border border-white px-6 py-3 font-bold hover:bg-white/10 transition"
          >
            I am under 21
          </button>
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