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
      data-oid="8xm8_c:"
    >
      <div
        className="max-w-md w-full bg-twisted-black/95 chrome-border p-8 text-center rounded-lg shadow-2xl border-2 border-white/20"
        data-oid="gf4x.q0"
      >
        {/* Added bg-twisted-black, rounded-lg, shadow-xl */}
        <h2 className="text-3xl font-bold mb-6 cyber-text" data-oid="00r3_wn">
          Age Verification
        </h2>

        <div className="age-badge-lg mx-auto mb-6" data-oid="a011bjc">
          21+
        </div>

        <p className="mb-8" data-oid="svc35lu">
          You must be 21 years or older to enter Twisted Cantina's website. By
          entering, you confirm you are at least 21 years of age.
        </p>

        <div
          className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          data-oid="k32ioja"
        >
          <Button variant="primary" onClick={handleVerify} data-oid="01d_3p5">
            I am 21 or older
          </Button>

          <Button
            variant="secondary"
            onClick={handleDecline}
            className="border-white hover:bg-white/10" // Keep existing border/hover if needed, or adjust Button component
            data-oid="06kgf3s"
          >
            I am under 21
          </Button>
        </div>

        {error && (
          <div className="mt-6 text-red-400" data-oid="duxn6xw">
            Sorry, you must be 21 or older to enter this site.
          </div>
        )}
      </div>
    </div>
  );
};

export default AgeVerification;
