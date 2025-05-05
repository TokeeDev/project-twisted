"use client";

import { useState } from "react";
import Button from "./Button"; // Import the new Button component

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md animate-fadeIn"
      data-oid="7--euok"
    >
      <div
        className="max-w-md w-full bg-twisted-black/95 chrome-border p-8 text-center rounded-lg shadow-2xl border-2 border-white/20"
        data-oid="sv30zj."
      >
        {/* Added bg-twisted-black, rounded-lg, shadow-xl */}
        <h2 className="text-3xl font-bold mb-6 cyber-text" data-oid="w343g13">
          Age Verification
        </h2>

        <div className="age-badge-lg mx-auto mb-6" data-oid=":no81a3">
          21+
        </div>

        <p className="mb-8" data-oid="6i7vl:d">
          You must be 21 years or older to enter Twisted Cantina's website. By
          entering, you confirm you are at least 21 years of age.
        </p>

        <div
          className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          data-oid="h6hejc5"
        >
          <Button variant="primary" onClick={handleVerify} data-oid="6c9sh0t">
            I am 21 or older
          </Button>

          <Button
            variant="secondary"
            onClick={handleDecline}
            className="border-white hover:bg-white/10" // Keep existing border/hover if needed, or adjust Button component
            data-oid="4:o-l6a"
          >
            I am under 21
          </Button>
        </div>

        {error && (
          <div className="mt-6 text-red-400" data-oid="k7s8.ht">
            Sorry, you must be 21 or older to enter this site.
          </div>
        )}
      </div>
    </div>
  );
};

export default AgeVerification;
